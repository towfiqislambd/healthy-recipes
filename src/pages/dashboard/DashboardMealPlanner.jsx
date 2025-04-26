import { ThreeDotSvg } from '@/components/svg-container/SvgContainer';
import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Link } from 'react-router-dom';
import { useDeleteMealPlan } from '@/hooks/cms.mutations';
import { Loader } from '@/components/loader/Loader';
import Modal from '@/components/modals/Modal';
import EditMealModal from '@/components/modals/EditMealModal';
import { useAllCategories, useMealPlannerTable } from '@/hooks/cms.queries';
const days = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const DashboardMealPlanner = () => {
    const [itemId, setItemId] = useState('')
    const [open, setOpen] = useState(false);
    const [mealPlannerId, setMealPlannerId] = useState('');
    const { data: mealPlannerTableData, isLoading: tableDataLoading } = useMealPlannerTable();
    const { data: allCategory, isLoading: categoryLoading } = useAllCategories();
    const { mutateAsync: deleteMealPlan } = useDeleteMealPlan(mealPlannerId);

    if (tableDataLoading || categoryLoading) {
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
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            <td className="border border-[#B3BAC5] bg-[#FAEEDD] px-2 py-6 text-center text-[#444] font-semibold">Days</td>

                            {days.map((day) => (
                                <td key={day} className="border border-[#B3BAC5] bg-[#DBF4E4] px-2 py-6 text-center text-[#5A5C5F] font-medium">{day}</td>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {allCategory.map(category => (
                            <tr key={category?.id}>

                                <td className="border py-7 border-[#B3BAC5] bg-[#FAEEDD] font-medium text-center">
                                    {category?.category_name}
                                </td>

                                {/* Saturday */}
                                <td className="border border-[#B3BAC5] px-2 py-5 space-y-2 text-[#4c4d4e] relative">
                                    {(() => {
                                        const meals = mealPlannerTableData?.saturday
                                            ?.filter(item => item?.category?.category_name === category?.category_name)
                                            ?.flatMap(item => item?.meals || []);

                                        return (
                                            <>
                                                {meals?.length > 0 ? (
                                                    <>
                                                        <div className="absolute right-3 top-3">
                                                            <Popover>
                                                                <PopoverTrigger>
                                                                    <ThreeDotSvg />
                                                                </PopoverTrigger>
                                                                <PopoverContent className="w-[105px] sm:w-28 text-sm sm:text-base border space-y-1 sm:space-y-2">
                                                                    <button className="block" onClick={() => handleEditPlan()}>Edit</button>
                                                                    <button className="text-red-500 block" onClick={() => handleDeletePlan()}>Delete</button>
                                                                </PopoverContent>
                                                            </Popover>
                                                        </div>

                                                        <ul className="space-y-1 pt-5">
                                                            {meals?.map((data, idx) => (
                                                                <li key={idx} className="list-disc list-inside">
                                                                    {data?.recipe?.recipe_name}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </>
                                                ) : (
                                                    <span className="text-[#B3BAC5] px-3 text-center">Add Meal</span>
                                                )}
                                            </>
                                        );
                                    })()}
                                </td>

                                {/* Sunday */}
                                <td className="border border-[#B3BAC5] px-2 py-5 space-y-2 text-[#4c4d4e] relative">
                                    {(() => {
                                        const meals = mealPlannerTableData?.sunday
                                            ?.filter(item => item?.category?.category_name === category?.category_name)
                                            ?.flatMap(item => item?.meals || []);

                                        return (
                                            <>
                                                {meals?.length > 0 ? (
                                                    <>
                                                        <div className="absolute right-3 top-3">
                                                            <Popover>
                                                                <PopoverTrigger>
                                                                    <ThreeDotSvg />
                                                                </PopoverTrigger>
                                                                <PopoverContent className="w-[105px] sm:w-28 text-sm sm:text-base border space-y-1 sm:space-y-2">
                                                                    <button className="block" onClick={() => handleEditPlan()}>Edit</button>
                                                                    <button className="text-red-500 block" onClick={() => handleDeletePlan()}>Delete</button>
                                                                </PopoverContent>
                                                            </Popover>
                                                        </div>

                                                        <ul className="space-y-1 pt-5">
                                                            {meals?.map((data, idx) => (
                                                                <li key={idx} className="list-disc list-inside">
                                                                    {data?.recipe?.recipe_name}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </>
                                                ) : (
                                                    <span className="text-[#B3BAC5] px-3 text-center">Add Meal</span>
                                                )}
                                            </>
                                        );
                                    })()}
                                </td>

                                {/* Monday */}
                                <td className="border border-[#B3BAC5] px-2 py-5 space-y-2 text-[#4c4d4e] relative">
                                    {(() => {
                                        const meals = mealPlannerTableData?.monday
                                            ?.filter(item => item?.category?.category_name === category?.category_name)
                                            ?.flatMap(item => item?.meals || []);

                                        return (
                                            <>
                                                {meals?.length > 0 ? (
                                                    <>
                                                        <div className="absolute right-3 top-3">
                                                            <Popover>
                                                                <PopoverTrigger>
                                                                    <ThreeDotSvg />
                                                                </PopoverTrigger>
                                                                <PopoverContent className="w-[105px] sm:w-28 text-sm sm:text-base border space-y-1 sm:space-y-2">
                                                                    <button className="block" onClick={() => handleEditPlan()}>Edit</button>
                                                                    <button className="text-red-500 block" onClick={() => handleDeletePlan()}>Delete</button>
                                                                </PopoverContent>
                                                            </Popover>
                                                        </div>

                                                        <ul className="space-y-1 pt-5">
                                                            {meals?.map((data, idx) => (
                                                                <li key={idx} className="list-disc list-inside">
                                                                    {data?.recipe?.recipe_name}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </>
                                                ) : (
                                                    <span className="text-[#B3BAC5] px-3 text-center">Add Meal</span>
                                                )}
                                            </>
                                        );
                                    })()}
                                </td>

                                {/* Tuesday */}
                                <td className="border border-[#B3BAC5] px-2 py-5 space-y-2 text-[#4c4d4e] relative">
                                    {(() => {
                                        const meals = mealPlannerTableData?.tuesday
                                            ?.filter(item => item?.category?.category_name === category?.category_name)
                                            ?.flatMap(item => item?.meals || []);

                                        return (
                                            <>
                                                {meals?.length > 0 ? (
                                                    <>
                                                        <div className="absolute right-3 top-3">
                                                            <Popover>
                                                                <PopoverTrigger>
                                                                    <ThreeDotSvg />
                                                                </PopoverTrigger>
                                                                <PopoverContent className="w-[105px] sm:w-28 text-sm sm:text-base border space-y-1 sm:space-y-2">
                                                                    <button className="block" onClick={() => handleEditPlan()}>Edit</button>
                                                                    <button className="text-red-500 block" onClick={() => handleDeletePlan()}>Delete</button>
                                                                </PopoverContent>
                                                            </Popover>
                                                        </div>

                                                        <ul className="space-y-1 pt-5">
                                                            {meals?.map((data, idx) => (
                                                                <li key={idx} className="list-disc list-inside">
                                                                    {data?.recipe?.recipe_name}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </>
                                                ) : (
                                                    <span className="text-[#B3BAC5] px-3 text-center">Add Meal</span>
                                                )}
                                            </>
                                        );
                                    })()}
                                </td>

                                {/* Wednesday */}
                                <td className="border border-[#B3BAC5] px-2 py-5 space-y-2 text-[#4c4d4e] relative">
                                    {(() => {
                                        const meals = mealPlannerTableData?.wednesday
                                            ?.filter(item => item?.category?.category_name === category?.category_name)
                                            ?.flatMap(item => item?.meals || []);

                                        return (
                                            <>
                                                {meals?.length > 0 ? (
                                                    <>
                                                        <div className="absolute right-3 top-3">
                                                            <Popover>
                                                                <PopoverTrigger>
                                                                    <ThreeDotSvg />
                                                                </PopoverTrigger>
                                                                <PopoverContent className="w-[105px] sm:w-28 text-sm sm:text-base border space-y-1 sm:space-y-2">
                                                                    <button className="block" onClick={() => handleEditPlan()}>Edit</button>
                                                                    <button className="text-red-500 block" onClick={() => handleDeletePlan()}>Delete</button>
                                                                </PopoverContent>
                                                            </Popover>
                                                        </div>

                                                        <ul className="space-y-1 pt-5">
                                                            {meals?.map((data, idx) => (
                                                                <li key={idx} className="list-disc list-inside">
                                                                    {data?.recipe?.recipe_name}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </>
                                                ) : (
                                                    <span className="text-[#B3BAC5] px-3 text-center">Add Meal</span>
                                                )}
                                            </>
                                        );
                                    })()}
                                </td>

                                {/* Thursday */}
                                <td className="border border-[#B3BAC5] px-2 py-5 space-y-2 text-[#4c4d4e] relative">
                                    {(() => {
                                        const meals = mealPlannerTableData?.thursday
                                            ?.filter(item => item?.category?.category_name === category?.category_name)
                                            ?.flatMap(item => item?.meals || []);

                                        return (
                                            <>
                                                {meals?.length > 0 ? (
                                                    <>
                                                        <div className="absolute right-3 top-3">
                                                            <Popover>
                                                                <PopoverTrigger>
                                                                    <ThreeDotSvg />
                                                                </PopoverTrigger>
                                                                <PopoverContent className="w-[105px] sm:w-28 text-sm sm:text-base border space-y-1 sm:space-y-2">
                                                                    <button className="block" onClick={() => handleEditPlan()}>Edit</button>
                                                                    <button className="text-red-500 block" onClick={() => handleDeletePlan()}>Delete</button>
                                                                </PopoverContent>
                                                            </Popover>
                                                        </div>

                                                        <ul className="space-y-1 pt-5">
                                                            {meals?.map((data, idx) => (
                                                                <li key={idx} className="list-disc list-inside">
                                                                    {data?.recipe?.recipe_name}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </>
                                                ) : (
                                                    <span className="text-[#B3BAC5] px-3 text-center">Add Meal</span>
                                                )}
                                            </>
                                        );
                                    })()}
                                </td>

                                {/* Friday */}
                                <td className="border border-[#B3BAC5] px-2 py-5 space-y-2 text-[#4c4d4e] relative">
                                    {(() => {
                                        const meals = mealPlannerTableData?.friday
                                            ?.filter(item => item?.category?.category_name === category?.category_name)
                                            ?.flatMap(item => item?.meals || []);

                                        return (
                                            <>
                                                {meals?.length > 0 ? (
                                                    <>
                                                        <div className="absolute right-3 top-3">
                                                            <Popover>
                                                                <PopoverTrigger>
                                                                    <ThreeDotSvg />
                                                                </PopoverTrigger>
                                                                <PopoverContent className="w-[105px] sm:w-28 text-sm sm:text-base border space-y-1 sm:space-y-2">
                                                                    <button className="block" onClick={() => handleEditPlan()}>Edit</button>
                                                                    <button className="text-red-500 block" onClick={() => handleDeletePlan()}>Delete</button>
                                                                </PopoverContent>
                                                            </Popover>
                                                        </div>

                                                        <ul className="space-y-1 pt-5">
                                                            {meals?.map((data, idx) => (
                                                                <li key={idx} className="list-disc list-inside">
                                                                    {data?.recipe?.recipe_name}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </>
                                                ) : (
                                                    <span className="text-[#B3BAC5] px-3 text-center">Add Meal</span>
                                                )}
                                            </>
                                        );
                                    })()}
                                </td>

                            </tr>
                        ))}
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
