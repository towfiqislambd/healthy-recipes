import { ThreeDotSvg } from '@/components/svg-container/SvgContainer';
import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Link } from 'react-router-dom';
import { useAllCategories, useMealPlannerTable } from '@/hooks/cms.queries';
import { useDeleteMealPlan } from '@/hooks/cms.mutations';
import { Loader } from '@/components/loader/Loader';

const DashboardMealPlanner = () => {
    const [mealPlannerId, setMealPlannerId] = useState('');
    const [activeTab, setActiveTab] = useState({ id: 0, category_name: 'All Recipes' });
    const { data: allCategories, isLoading: categoryLoading } = useAllCategories();
    const { data: mealPlannerTableData, isLoading: mealPlannerLoading } = useMealPlannerTable(activeTab?.id);
    const { mutateAsync: deleteMealPlan } = useDeleteMealPlan(mealPlannerId);

    if (categoryLoading || mealPlannerLoading) {
        return <div className="flex justify-center items-center h-[85vh]"><Loader /></div>;
    }

    // Delete Meal Plan
    const handleDeletePlan = async (meal_plan_id) => {
        if (meal_plan_id) {
            setMealPlannerId(meal_plan_id)
            await deleteMealPlan()
        }
    }

    return (
        <section className="p-5">
            <h3 className="mb-7 text-2xl text-[#E48E19] font-semibold font-merriweather">
                Customize your meal plan
            </h3>

            {/* Tabs */}
            <div className="py-8 w-full flex flex-wrap items-center justify-center 2xl:justify-between gap-x-1 gap-y-2">

                <button
                    onClick={() => setActiveTab({ id: 0, category_name: 'All Recipes' })}
                    className={`px-4 2xl:px-6 2xl:py-3 py-2 rounded-full font-medium ${activeTab?.category_name === 'All Recipes'
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
                        className={`px-4 2xl:px-6 2xl:py-3 py-2 rounded-full font-medium ${tab?.category_name === activeTab?.category_name
                            ? 'bg-[#3A3A3A] text-white'
                            : 'bg-transparent text-textColor'
                            }`}
                    >
                        {tab?.category_name}
                    </button>
                ))}
            </div>

            {/* Table */}
            <table className="bg-[#F6F7FB] px-5 rounded w-full border-separate border-spacing-y-5">
                <thead>
                    <tr className="text-[#5A5C5F] text-lg text-center font-merriweather">
                        <th className="bg-[#FCBD66] w-[10%] py-3 px-5">
                            Weekly Days (January)
                        </th>
                        <th
                            colSpan={7}
                            className="bg-[#B7E4C7] py-6 font-medium w-[90%]"
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
                                    <tr key={data.id} className="text-[#5A5C5F] font-merriweather">
                                        <td className="bg-[#FCBD66] px-4 py-5 border border-[#FCBD66]">
                                            {data.date}
                                        </td>
                                        {itemsWithPlaceholders.map((item, index) => (
                                            <td
                                                key={index}
                                                className="border-r border-t border-b border-[#8993A4] px-4 py-5"
                                            >
                                                <div className="flex items-center justify-between gap-2">
                                                    <p>{item.item}</p>
                                                    <Popover>
                                                        <PopoverTrigger>
                                                            <ThreeDotSvg />
                                                        </PopoverTrigger>
                                                        <PopoverContent className='w-28 border space-y-2'>
                                                            <button><Link to='/meal-planner'>Add meal</Link></button>
                                                            <button>Edit</button>
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
        </section>
    );
};

export default DashboardMealPlanner;
