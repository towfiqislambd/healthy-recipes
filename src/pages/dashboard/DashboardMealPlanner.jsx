import { ThreeDotSvg } from '@/components/svg-container/SvgContainer';
import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Link } from 'react-router-dom';
import { useAllCategories, useMealPlannerTable } from '@/hooks/cms.queries';
import { useDeleteMealPlan } from '@/hooks/cms.mutations';
import { Loader } from '@/components/loader/Loader';
import Modal from '@/components/modals/Modal';
import EditMealModal from '@/components/modals/EditMealModal';

const DashboardMealPlanner = () => {
    const [selectedMonth, setSelectedMonth] = useState('');
    const [itemId, setItemId] = useState('')
    const [open, setOpen] = useState(false);
    const [mealPlannerId, setMealPlannerId] = useState('');
    const [activeTab, setActiveTab] = useState({ id: 0, category_name: 'All Recipes' });
    const { data: allCategories, isLoading: categoryLoading } = useAllCategories();
    const { data: mealPlannerTableData, isLoading: mealPlannerLoading } = useMealPlannerTable(activeTab?.id, selectedMonth);
    const { mutateAsync: deleteMealPlan } = useDeleteMealPlan(mealPlannerId);

    if (categoryLoading || mealPlannerLoading) {
        return <div className="flex justify-center items-center h-[85vh]"><Loader /></div>;
    }

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
        <section className="3xl:p-5">
            <h3 className="3xl:mb-7 text-xl 2xl:text-2xl text-[#E48E19] font-semibold font-merriweather">
                Customize your meal plan
            </h3>

            {/* Tabs */}
            <div className="py-5 2xl:py-8 w-full flex flex-wrap items-center justify-center 2xl:justify-between gap-x-1 gap-y-2">

                <button
                    onClick={() => setActiveTab({ id: 0, category_name: 'All Recipes' })}
                    className={`px-3 sm:px-4 3xl:px-6 py-[5px] text-[15px] sm:text-base sm:py-2 3xl:py-3 rounded-full font-medium ${activeTab?.category_name === 'All Recipes'
                        ? 'bg-[#3A3A3A] text-white'
                        : 'bg-transparent text-textColor'
                        }`}
                >
                    All Recipes
                </button>

                {allCategories?.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab)}
                        className={`px-3 sm:px-4 3xl:px-6 py-[5px] text-[15px] sm:text-base sm:py-2 3xl:py-3 rounded-full font-medium ${tab?.category_name === activeTab?.category_name
                            ? 'bg-[#3A3A3A] text-white'
                            : 'bg-transparent text-textColor'
                            }`}
                    >
                        {tab?.category_name}
                    </button>
                ))}
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="rounded bg-[#F6F7FB] w-full border-separate border-spacing-y-3 sm:border-spacing-y-4">
                    <thead>
                        <tr className="text-[#5A5C5F] text-lg text-center font-merriweather text-nowrap">
                            <th className="bg-[#FCBD66] w-[150px] py-1 sm:py-2 4xl:px-3">
                                <select
                                    className="border border-[#FCBD66] rounded-[5px] px-3 py-2 text-sm sm:text-base sm:py-3 bg-transparent outline-none block w-full"
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
