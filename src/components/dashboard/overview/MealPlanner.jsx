import { ThreeDotSvg } from '@/components/svg-container/SvgContainer';
import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Link } from 'react-router-dom';
import { useDeleteMealPlan } from '@/hooks/cms.mutations';
import Modal from '@/components/modals/Modal';
import EditMealModal from '@/components/modals/EditMealModal';

const MealPlanner = ({ mealPlannerTableData, setSelectedMonth, selectedMonth }) => {
    const [itemId, setItemId] = useState('')
    const [open, setOpen] = useState(false);
    const [mealPlannerId, setMealPlannerId] = useState('');
    const { mutateAsync: deleteMealPlan } = useDeleteMealPlan(mealPlannerId);

    const monthData = [
        { id: 0, month: 'All' },
        { id: 1, month: 'January' },
        { id: 2, month: 'February' },
        { id: 3, month: 'March' },
        { id: 4, month: 'April' },
        { id: 5, month: 'May' },
        { id: 6, month: 'June' },
        { id: 7, month: 'July' },
        { id: 8, month: 'August' },
        { id: 9, month: 'September' },
        { id: 10, month: 'October' },
        { id: 11, month: 'November' },
        { id: 12, month: 'December' },
    ];

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
        <div>
            <h3 className="font-merriweather font-semibold text-[#141414] text-xl">Your customize meal planner</h3>

            <div className="overflow-x-auto">
                {/* Table */}
                <table className="rounded bg-[#F6F7FB] w-full border-separate border-spacing-y-4">
                    <thead>
                        <tr className="text-[#5A5C5F] text-lg text-center font-merriweather text-nowrap">
                            <th className="bg-[#FCBD66] w-[150px] py-2 4xl:px-3">
                                <select
                                    className="border border-[#FCBD66] rounded-[5px] px-3 py-3 bg-transparent outline-none block w-full"
                                    value={selectedMonth}
                                    onChange={(e) => setSelectedMonth(Number(e.target.value))}
                                >
                                    {monthData?.map((item, idx) => (
                                        <option key={idx} value={item?.id}>
                                            {item?.month}
                                        </option>
                                    ))}
                                </select>


                            </th>
                            <th
                                colSpan={7}
                                className="bg-[#B7E4C7] py-2 w-[calc(100% - 150px)] font-medium"
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
                                        <tr key={data.id} className="text-[#5A5C5F] font-merriweather text-nowrap">
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
                                                            <PopoverContent className='w-28 border space-y-2'>
                                                                <button><Link to='/meal-planner'>Add meal</Link></button>
                                                                <button onClick={() => handleEditPlan(item?.id)}>Edit</button>
                                                                <button onClick={() => handleDeletePlan(item?.meal_plan_id)} className='text-red-500'>Delete</button>
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
        </div>
    );
};

export default MealPlanner;