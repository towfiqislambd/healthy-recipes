import { ThreeDotSvg } from '@/components/svg-container/SvgContainer';
import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Link } from 'react-router-dom';
import { useDeleteMealPlan } from '@/hooks/cms.mutations';
import { Loader } from '@/components/loader/Loader';
import Modal from '@/components/modals/Modal';
import EditMealModal from '@/components/modals/EditMealModal';
import { useMealPlannerTable } from '@/hooks/cms.queries';

const DashboardMealPlanner = () => {
    const [itemId, setItemId] = useState('')
    const [open, setOpen] = useState(false);
    const [mealPlannerId, setMealPlannerId] = useState('');
    const { data: mealPlannerTableData, isLoading } = useMealPlannerTable();
    const { mutateAsync: deleteMealPlan } = useDeleteMealPlan(mealPlannerId);

    if (isLoading) {
        return <div className="flex justify-center items-center h-[85vh]"><Loader /></div>;
    }

    // Delete Meal Plan
    const handleDeletePlan = async (meal_plan_id) => {
        if (meal_plan_id) {
            setMealPlannerId(meal_plan_id)
            await deleteMealPlan()
        }
    }

    // Edit Meal Plan
    const handleEditPlan = (item_id) => {
        setOpen(true);
        setItemId(item_id)
    }

    return (
        <section className="3xl:p-5">
            <div className="3xl:mb-7 flex justify-between items-center">
                <h3 className="text-xl 2xl:text-2xl text-[#E48E19] font-semibold font-merriweather">
                    Customize your meal plan
                </h3>
                <Link to='/meal-planner'><button className='px-3 py-1.5 text-[#5A5C5F] border border-primary rounded-lg'>Add meal</button></Link>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="rounded bg-[#F6F7FB] w-full border-separate border-spacing-y-3 sm:border-spacing-y-4">
                    <thead>
                        <tr className="text-[#5A5C5F] text-lg text-center font-merriweather text-nowrap">
                            <th className="bg-[#FCBD66] w-[150px] py-1 sm:py-2 4xl:px-3">
                                All
                            </th>
                            <th
                                colSpan={7}
                                className="bg-[#B7E4C7] py-1 sm:py- w-[calc(100% - 150px)] font-medium"
                            >
                                Food Menus
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            mealPlannerTableData?.length > 0 ?
                                mealPlannerTableData?.map((data) => {
                                    const itemsWithPlaceholders = [
                                        ...data.items,
                                        ...Array(7 - data.items.length).fill({ item: 'No meal' })
                                    ].slice(0, 7); // Ensure exactly 7 items

                                    return (
                                        <tr key={data.id} className="text-[#5A5C5F] text-sm sm:text-base font-merriweather text-nowrap">
                                            <td className="bg-[#FCBD66] px-4 py-3 4xl:py-5 border border-[#FCBD66]">
                                                {data.date}
                                            </td>
                                            {itemsWithPlaceholders.map((item, index) => (
                                                <td
                                                    key={index}
                                                    className="border-r border-t border-b border-[#8993A4] px-3 py-3 4xl:py-5"
                                                >
                                                    <div className="flex items-center justify-between gap-2">
                                                        <p>
                                                            {
                                                                item?.name ? item?.name : item?.item
                                                            }
                                                        </p>
                                                        <Popover>
                                                            <PopoverTrigger>
                                                                <ThreeDotSvg />
                                                            </PopoverTrigger>
                                                            <PopoverContent className='w-[105px] sm:w-28 text-sm sm:text-base border space-y-1 sm:space-y-2'>
                                                                <button className='block'><Link to='/meal-planner'>Add meal</Link></button>
                                                                <button className='block' onClick={() => handleEditPlan(item?.id)}>Edit</button>
                                                                <button onClick={() => handleDeletePlan(item?.meal_plan_id)} className='text-red-500 block'>Delete</button>
                                                            </PopoverContent>
                                                        </Popover>
                                                    </div>
                                                </td>
                                            ))}
                                        </tr>
                                    );
                                })
                                :
                                'No data found'
                        }
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            <Modal open={open} setOpen={setOpen}>
                <EditMealModal
                    open={open}
                    setOpen={setOpen}
                    itemId={itemId}
                />
            </Modal>
        </section>
    );
};

export default DashboardMealPlanner;
