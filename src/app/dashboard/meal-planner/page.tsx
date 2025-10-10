"use client";
import Modal from "@/Components/Common/Modal";
import EditMealModal from "@/Components/Modals/EditMealModal";
import { ThreeDotSvg } from "@/Components/Svg/SvgContainer";
import {
  getAllCategories,
  getMealPlannerTableData,
  useDeleteMealPlanner,
} from "@/Hooks/api/cms_api";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover";
import { Spinner } from "@/Components/Loader/Loader";
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

const page = () => {
  // States
  const popoverTriggerRef = useRef<any>(null);
  const [itemId, setItemId] = useState<number | null>(null);
  const [recipe, setRecipe] = useState(null);
  const [open, setOpen] = useState(false);
  const [activeAction, setActiveAction] = useState<any>({
    day: null,
    category: null,
    action: null,
  });

  // Queries
  const { data: mealPlannerTableData, isLoading: tableDataLoading } =
    getMealPlannerTableData();
  const { data: allCategory, isLoading: categoryLoading } = getAllCategories();

  // Mutation
  const { mutateAsync: deletePlanMutation } = useDeleteMealPlanner();

  if (tableDataLoading || categoryLoading) {
    return (
      <div className="flex justify-center items-center h-[85vh]">
        <Spinner />
      </div>
    );
  }

  const handleDeletePlans = async (meal_plan_id: number) => {
    if (meal_plan_id) {
      await deletePlanMutation({
        endpoint: `/api/meal/${meal_plan_id}`,
      });
    }
  };

  const handleEditPlans = (item_id: number) => {
    setOpen(true);
    setItemId(item_id);
  };

  const renderDayCell = (day: any, category: any) => {
    const meals = mealPlannerTableData?.data?.[day.toLowerCase()]
      ?.filter(
        (item: any) => item?.category?.category_name === category?.category_name
      )
      ?.flatMap((item: any) => item?.meals || []);
    console.log(meals);

    const handleEditPlan = () => {
      setActiveAction((prev: any) => ({
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
      setActiveAction((prev: any) => ({
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

    const isActive = (action: any) =>
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
                  <button className="p-1 cursor-pointer">
                    <ThreeDotSvg />
                  </button>
                </PopoverTrigger>

                <PopoverContent className="w-[105px] md:w-28 text-sm md:text-base border border-gray-200 shadow space-y-1 sm:space-y-2">
                  <button
                    className="block w-full text-left cursor-pointer"
                    onClick={handleEditPlan}
                  >
                    {isActive("edit") ? "Cancel" : "Edit Meal"}
                  </button>

                  <button
                    className="text-red-500 block w-full text-left cursor-pointer"
                    onClick={handleDeletePlan}
                  >
                    {isActive("delete") ? "Cancel" : "Delete"}
                  </button>
                </PopoverContent>
              </Popover>
            </div>

            <ul className="space-y-1 sm:space-y-2 pt-5">
              {meals?.map((data: any, idx: number) => (
                <li key={idx} className="flex items-center gap-1 group">
                  <span
                    className="text-3xl sm:text-4xl leading-4 h-4 flex items-center"
                    style={{
                      color:
                        categoryColors[
                          allCategory?.data?.findIndex(
                            (cat: any) =>
                              cat.category_name === category.category_name
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
                      className="ml-1 flex-shrink-0 cursor-pointer"
                    >
                      <MdOutlineModeEditOutline className="text-lg sm:text-xl text-primary-orange" />
                    </button>
                  )}

                  {isActive("delete") && (
                    <button
                      onClick={() => handleDeletePlans(data?.meal_plan_id)}
                      className="ml-1 flex-shrink-0 cursor-pointer"
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

        <Link
          href="/meal-planner"
          className="px-2 py-1 sm:px-4 sm:py-2 text-sm sm:text-base text-[#5A5C5F] border border-primary-orange rounded-lg"
        >
          Add meal
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
            {allCategory?.data.map((category: any, idx: number) => (
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
      <Modal open={open} onClose={() => setOpen(false)}>
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

export default page;
