import { ThreeDotSvg } from "@/components/svg-container/SvgContainer";
import { useRef, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Link } from "react-router-dom";
import { useDeleteMealPlan } from "@/hooks/cms.mutations";
import { Loader } from "@/components/loader/Loader";
import Modal from "@/components/modals/Modal";
import EditMealModal from "@/components/modals/EditMealModal";
import { useAllCategories, useMealPlannerTable } from "@/hooks/cms.queries";
const days = [
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];
const categoryColors = [
  "#049361",
  "#3D76CC",
  "#813FA8",
  "#9D2A58",
  "#675FD4",
  "#CD33DB",
  "#933386",
  "#C0684D",
];
import { MdOutlineModeEditOutline } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

const DashboardMealPlanner = () => {
  const [itemId, setItemId] = useState("");
  const [recipe, setRecipe] = useState(null);
  const [open, setOpen] = useState(false);
  const [mealPlannerId, setMealPlannerId] = useState("");
  const { data: mealPlannerTableData, isLoading: tableDataLoading } =
    useMealPlannerTable();
  const { data: allCategory, isLoading: categoryLoading } = useAllCategories();
  const { mutateAsync: deleteMealPlan } = useDeleteMealPlan(mealPlannerId);

  const [activeAction, setActiveAction] = useState({
    day: null,
    category: null,
    action: null, // 'edit', 'delete', or null
  });

  const popoverTriggerRef = useRef(null);

  if (tableDataLoading || categoryLoading) {
    return (
      <div className="flex justify-center items-center h-[85vh]">
        <Loader />
      </div>
    );
  }

  const handleDeletePlans = async meal_plan_id => {
    if (meal_plan_id) {
      setMealPlannerId(meal_plan_id);
      await deleteMealPlan();
    }
  };

  const handleEditPlans = item_id => {
    setOpen(true);
    setItemId(item_id);
  };

  const renderDayCell = (day, category) => {
    const meals = mealPlannerTableData?.[day.toLowerCase()]
      ?.filter(
        item => item?.category?.category_name === category?.category_name
      )
      ?.flatMap(item => item?.meals || []);

    const handleEditPlan = () => {
      setActiveAction(prev => ({
        day,
        category: category?.category_name,
        action:
          prev.action === "edit" &&
          prev.day === day &&
          prev.category === category?.category_name
            ? null
            : "edit",
      }));
      if (popoverTriggerRef.current) popoverTriggerRef.current.click();
    };

    const handleDeletePlan = () => {
      setActiveAction(prev => ({
        day,
        category: category?.category_name,
        action:
          prev.action === "delete" &&
          prev.day === day &&
          prev.category === category?.category_name
            ? null
            : "delete",
      }));
      if (popoverTriggerRef.current) popoverTriggerRef.current.click();
    };

    const isActive = action =>
      activeAction.action === action &&
      activeAction.day === day &&
      activeAction.category === category?.category_name;

    return (
      <>
        {meals?.length > 0 ? (
          <>
            <div className="absolute right-1 top-1 sm:right-2 sm:top-2 md:right-3 md:top-3">
              <Popover>
                <PopoverTrigger ref={popoverTriggerRef}>
                  <p className="p-1">
                    <ThreeDotSvg className="w-2 h-2 sm:w-4 sm:h-4" />
                  </p>
                </PopoverTrigger>
                <PopoverContent className="w-[105px] md:w-28 text-sm md:text-base border space-y-1 sm:space-y-2">
                  <button
                    className="block w-full text-left"
                    onClick={handleEditPlan}
                  >
                    {isActive("edit") ? "Cancel" : "Edit Meal"}
                  </button>
                  <button
                    className="text-red-500 block w-full text-left"
                    onClick={handleDeletePlan}
                  >
                    {isActive("delete") ? "Cancel" : "Delete"}
                  </button>
                </PopoverContent>
              </Popover>
            </div>

            <ul className="space-y-1 sm:space-y-2 pt-5">
              {meals?.map((data, idx) => (
                <li key={idx} className="flex items-center gap-1 group">
                  <span
                    className="text-3xl sm:text-4xl leading-4 h-4 flex items-center"
                    style={{
                      color:
                        categoryColors[
                          allCategory.findIndex(
                            cat => cat.category_name === category.category_name
                          ) % categoryColors.length
                        ],
                    }}
                  >
                    •
                  </span>
                  <span className="flex-1 text-xs sm:text-sm md:text-[15px]">
                    {data?.name ? data?.name : data?.recipe?.recipe_name}
                  </span>

                  {isActive("edit") && (
                    <button
                      onClick={() => {
                        handleEditPlans(data?.id);
                        setRecipe(data);
                      }}
                      className="ml-1 flex-shrink-0"
                    >
                      <MdOutlineModeEditOutline className="text-lg sm:text-xl text-primary" />
                    </button>
                  )}

                  {isActive("delete") && (
                    <button
                      onClick={() => handleDeletePlans(data?.meal_plan_id)}
                      className="ml-1 flex-shrink-0"
                    >
                      <RxCross2 className="text-lg sm:text-xl text-red-500" />
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <span className="text-[#B3BAC5] text-xs sm:text-sm text-nowrap px-1 sm:px-3 text-center">
            Add Meal
          </span>
        )}
      </>
    );
  };

  return (
    <section className="p-2 sm:p-3 md:p-4 lg:p-5 3xl:p-5">
      <div className="mb-4 sm:mb-5 md:mb-6 3xl:mb-7 flex flex-col xs:flex-row justify-between items-start xs:items-center gap-1 sm:gap-0">
        <h3 className="sm:text-lg md:text-xl 2xl:text-2xl text-[#E48E19] font-semibold font-merriweather">
          Customize your meal plan
        </h3>
        <Link to="/meal-planner">
          <button className="px-2 py-1 sm:px-4 sm:py-2 text-sm sm:text-base text-[#5A5C5F] border border-primary rounded-lg">
            Add meal
          </button>
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-[#B3BAC5]">
        <table className="w-full border-collapse min-w-[600px] sm:min-w-0">
          <thead>
            <tr className="bg-gray-100 ">
              <td className="border-b border-r border-[#B3BAC5] bg-[#FAEEDD] w-0 px-0 py-4 sm:py-5 md:py-6 lg:py-7 text-center text-[#444] font-semibold">
                <p className="-rotate-90 text-xs sm:text-sm md:text-base">
                  Days
                </p>
              </td>

              {days.map(day => (
                <td
                  key={day}
                  className="border-b border-r last:border-r-0 border-[#B3BAC5] bg-[#DBF4E4] px-1 sm:px-2 py-3 sm:py-4 md:py-5 lg:py-6 text-center text-xs sm:text-sm text-[#5A5C5F] font-medium"
                >
                  {day}
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            {allCategory.map((category, idx) => (
              <tr key={category?.id} className="text-nowrap">
                <td
                  className="border-t border-r w-0 px-0 py-8 md:py-10 border-[#B3BAC5] bg-[#FAEEDD] font-medium text-center"
                  style={{ color: categoryColors[idx % categoryColors.length] }}
                >
                  <p className="-rotate-90 text-xs sm:text-sm md:text-base whitespace-nowrap">
                    {category?.category_name}
                  </p>
                </td>

                {/* Days cells */}
                {days.map(day => (
                  <td
                    key={day}
                    className="border-t border-r last:border-r-0 border-[#B3BAC5] px-2 sm:px-3 md:px-3 py-2 sm:py-3 md:py-4 lg:py-4 space-y-1 sm:space-y-2 text-[#4c4d4e] relative text-xs sm:text-sm md:text-[15px]"
                  >
                    {renderDayCell(day, category)}
                  </td>
                ))}
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
          recipe={recipe}
        />
      </Modal>
    </section>
  );
};

export default DashboardMealPlanner;
