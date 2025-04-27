import { ThreeDotSvg } from '@/components/svg-container/SvgContainer';
import { useRef, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Link } from 'react-router-dom';
import { useDeleteMealPlan } from '@/hooks/cms.mutations';
import { Loader } from '@/components/loader/Loader';
import Modal from '@/components/modals/Modal';
import EditMealModal from '@/components/modals/EditMealModal';
import { useAllCategories, useMealPlannerTable } from '@/hooks/cms.queries';
const days = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const categoryColors = ['#049361', '#3D76CC', '#813FA8', '#9D2A58', '#675FD4', '#CD33DB', '#933386', '#C0684D'];
import { MdOutlineModeEditOutline } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

const DashboardMealPlanner = () => {
    const [itemId, setItemId] = useState('')
    const [open, setOpen] = useState(false);
    const [mealPlannerId, setMealPlannerId] = useState('');
    const { data: mealPlannerTableData, isLoading: tableDataLoading } = useMealPlannerTable();
    const { data: allCategory, isLoading: categoryLoading } = useAllCategories();
    const { mutateAsync: deleteMealPlan } = useDeleteMealPlan(mealPlannerId);

    // Updated state to track active action with day and category
    const [activeAction, setActiveAction] = useState({
        day: null,
        category: null,
        action: null // 'edit', 'delete', or null
    });

    const popoverTriggerRef = useRef(null);

    if (tableDataLoading || categoryLoading) {
        return <div className="flex justify-center items-center h-[85vh]"><Loader /></div>;
    }

    const handleDeletePlans = async (meal_plan_id) => {
        if (meal_plan_id) {
            setMealPlannerId(meal_plan_id)
            await deleteMealPlan()
        }
    }

    const handleEditPlans = (item_id) => {
        setOpen(true);
        setItemId(item_id)
    }

    // Helper function to render each day's cell
    const renderDayCell = (day, category) => {
        const meals = mealPlannerTableData?.[day.toLowerCase()]
            ?.filter(item => item?.category?.category_name === category?.category_name)
            ?.flatMap(item => item?.meals || []);

        const handleEditPlan = () => {
            setActiveAction(prev => ({
                day,
                category: category?.category_name,
                action: prev.action === 'edit' && prev.day === day && prev.category === category?.category_name
                    ? null
                    : 'edit'
            }));
            if (popoverTriggerRef.current) popoverTriggerRef.current.click();
        };

        const handleDeletePlan = () => {
            setActiveAction(prev => ({
                day,
                category: category?.category_name,
                action: prev.action === 'delete' && prev.day === day && prev.category === category?.category_name
                    ? null
                    : 'delete'
            }));
            if (popoverTriggerRef.current) popoverTriggerRef.current.click();
        };

        const isActive = (action) => (
            activeAction.action === action &&
            activeAction.day === day &&
            activeAction.category === category?.category_name
        );

        return (
            <>
                {meals?.length > 0 ? (
                    <>
                        <div className="absolute right-3 top-3">
                            <Popover>
                                <PopoverTrigger ref={popoverTriggerRef}>
                                    <button>
                                        <ThreeDotSvg />
                                    </button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[105px] sm:w-28 text-sm sm:text-base border space-y-1 sm:space-y-2">
                                    <button
                                        className="block w-full text-left"
                                        onClick={handleEditPlan}
                                    >
                                        {isActive('edit') ? 'Cancel' : 'Edit Meal'}
                                    </button>
                                    <button
                                        className="text-red-500 block w-full text-left"
                                        onClick={handleDeletePlan}
                                    >
                                        {isActive('delete') ? 'Cancel' : 'Delete'}
                                    </button>
                                </PopoverContent>
                            </Popover>
                        </div>

                        <ul className="space-y-2 pt-3">
                            {meals?.map((data, idx) => (
                                <li key={idx} className="flex items-start gap-1 group">
                                    <span className="text-4xl leading-4 h-4 flex items-center">•</span>
                                    <span className="flex-1 -mt-1">
                                        {data?.name ? data?.name : data?.recipe?.recipe_name}
                                    </span>

                                    {isActive('edit') && (
                                        <button onClick={() => handleEditPlans(data?.id)}>
                                            <MdOutlineModeEditOutline className='text-xl text-primary' />
                                        </button>
                                    )}

                                    {isActive('delete') && (
                                        <button onClick={() => handleDeletePlans(data?.meal_plan_id)}>
                                            <RxCross2 className='text-xl text-red-500' />
                                        </button>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </>
                ) : (
                    <span className="text-[#B3BAC5] text-nowrap px-3 text-center">Add Meal</span>
                )}
            </>
        );
    };

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
                            <td className="border border-[#B3BAC5] bg-[#FAEEDD] w-0 px-0 py-7 text-center text-[#444] font-semibold">
                                <p className='-rotate-90'>Days</p>
                            </td>

                            {days.map((day) => (
                                <td key={day} className="border border-[#B3BAC5] bg-[#DBF4E4] px-2 py-6 text-center text-[#5A5C5F] font-medium">{day}</td>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {allCategory.map((category, idx) => (
                            <tr key={category?.id}>
                                <td
                                    className="border w-0 px-0 py-12 border-[#B3BAC5] bg-[#FAEEDD] font-medium text-center"
                                    style={{ color: categoryColors[idx % categoryColors.length] }}
                                >
                                    <p className='-rotate-90'>{category?.category_name}</p>
                                </td>

                                {/* Saturday */}
                                <td className="border border-[#B3BAC5] px-4 py-5 space-y-2 text-[#4c4d4e] relative text-[15px]">
                                    {renderDayCell('Saturday', category)}
                                </td>

                                {/* Sunday */}
                                <td className="border border-[#B3BAC5] px-4 py-5 space-y-2 text-[#4c4d4e] relative text-[15px]">
                                    {renderDayCell('Sunday', category)}
                                </td>

                                {/* Monday */}
                                <td className="border border-[#B3BAC5] px-4 py-5 space-y-2 text-[#4c4d4e] relative text-[15px]">
                                    {renderDayCell('Monday', category)}
                                </td>

                                {/* Tuesday */}
                                <td className="border border-[#B3BAC5] px-4 py-5 space-y-2 text-[#4c4d4e] relative text-[15px]">
                                    {renderDayCell('Tuesday', category)}
                                </td>

                                {/* Wednesday */}
                                <td className="border border-[#B3BAC5] px-4 py-5 space-y-2 text-[#4c4d4e] relative text-[15px]">
                                    {renderDayCell('Wednesday', category)}
                                </td>

                                {/* Thursday */}
                                <td className="border border-[#B3BAC5] px-4 py-5 space-y-2 text-[#4c4d4e] relative text-[15px]">
                                    {renderDayCell('Thursday', category)}
                                </td>

                                {/* Friday */}
                                <td className="border border-[#B3BAC5] px-4 py-5 space-y-2 text-[#4c4d4e] relative text-[15px]">
                                    {renderDayCell('Friday', category)}
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