"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { useState } from "react";
import toast from "react-hot-toast";
import { CgSpinnerTwo } from "react-icons/cg";
import { getAllCategories, useAddMealPlanner } from "@/Hooks/api/cms_api";

type categoryItem = {
  id: string;
  category_name: string;
};

interface addMealProps {
  recipeId: null | number;
  setOpen: any;
}

const AddMealModal = ({ recipeId, setOpen }: addMealProps) => {
  // States
  const [category_id, setCategoryId] = useState<number | null>(null);
  const [day, setDay] = useState<string>("");

  // Queries & Mutation
  const { data: recipeCategory } = getAllCategories();
  const { mutateAsync: addMealPlanner, isPending } =
    useAddMealPlanner(recipeId);

  const filterClass = `text-sm lg:text-base !py-1.5 lg:!py-2 2xl:!py-3 px-3 focus:bg-primary-orange font-poppins text-textColor focus:text-white cursor-pointer`;

  const handleDayChange = (value: string) => {
    setDay(value);
  };

  const handleCategoryChange = (value: any) => {
    setCategoryId(value);
  };

  const handleAddPlan = async () => {
    if (!category_id || !day) {
      return toast.error("Please select at least a day and a category");
    }
    const data = { day, category_id };
    await addMealPlanner(data);
    setCategoryId(null);
    setDay("");
    setOpen(false);
  };

  return (
    <div className="w-full">
      {/* Title */}
      <h5 className=" font-newBaskerville font-semibold text-center text-[#5A5C5F] leading-[132%] text-lg mt-5 md:text-xl">
        Plan for a meal
      </h5>

      {/* Day */}
      <div className="mt-5 md:mt-7 mb-5">
        <Select onValueChange={handleDayChange}>
          <SelectTrigger className="w-full h-11 rounded-[6px] px-4 text-base focus:ring-primary-orange">
            <SelectValue placeholder="Select a day..." />
          </SelectTrigger>
          <SelectContent className="px-0 py-0">
            <SelectItem value="saturday" className={filterClass}>
              Saturday
            </SelectItem>
            <SelectItem value="sunday" className={filterClass}>
              Sunday
            </SelectItem>
            <SelectItem value="monday" className={filterClass}>
              Monday
            </SelectItem>
            <SelectItem value="tuesday" className={filterClass}>
              Tuesday
            </SelectItem>
            <SelectItem value="wednesday" className={filterClass}>
              Wednesday
            </SelectItem>
            <SelectItem value="thursday" className={filterClass}>
              Thursday
            </SelectItem>
            <SelectItem value="friday" className={filterClass}>
              Friday
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Categories */}
      <Select onValueChange={handleCategoryChange}>
        <SelectTrigger className="w-full h-11 rounded-[6px] px-4 text-base focus:ring-primary-orange">
          <SelectValue placeholder="Select a category..." />
        </SelectTrigger>
        <SelectContent className="px-0 py-0">
          {recipeCategory?.map((item: categoryItem, idx: number) => (
            <SelectItem key={idx} value={item?.id} className={filterClass}>
              {item?.category_name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* buttons */}
      <div className="pt-6 pb-3 flex items-center justify-center gap-3">
        <button
          onClick={handleAddPlan}
          className="px-5 py-2.5 border border-primary-orange bg-primary-orange text-white rounded-md"
        >
          {isPending ? (
            <CgSpinnerTwo className="animate-spin size-6" />
          ) : (
            "Add to planner"
          )}
        </button>

        <button
          onClick={() => setOpen(false)}
          className="px-8 py-2.5 border border-primary-orange text-primary-orange rounded-md"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddMealModal;
