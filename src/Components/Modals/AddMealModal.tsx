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
import { BiLoaderCircle } from "react-icons/bi";
import { getAllCategories, useAddMealPlanner } from "@/Hooks/api/cms_api";

type categoryItem = {
  id: string;
  category_name: string;
};

interface addMealProps {
  recipeId: null | number;
  setOpen: (open: boolean) => void;
}

const AddMealModal = ({ recipeId, setOpen }: addMealProps) => {
  // States
  const [category_id, setCategoryId] = useState<number | null>(null);
  const [day, setDay] = useState<string>("");

  // Static day options
  const days = [
    "saturday",
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
  ];

  // Queries & Mutation
  const { data: recipeCategory } = getAllCategories();
  const { mutateAsync: addMealPlanner, isPending } =
    useAddMealPlanner(recipeId);

  // Handlers
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
    <>
      {/* Title */}
      <h5 className="font-newBaskerville font-semibold text-center text-[#5A5C5F] leading-[132%] text-lg mt-5 md:text-xl">
        Plan for a meal
      </h5>

      {/* Day Select */}
      <div className="mt-5 md:mt-7 mb-5 z-[99999]">
        <Select onValueChange={setDay}>
          <SelectTrigger className="w-full py-5 rounded-[6px] px-4 text-base focus:ring-primary-orange">
            <SelectValue placeholder="Select a day..." />
          </SelectTrigger>
          <SelectContent className="px-0 py-0 border-transparent">
            {days?.map(dayItem => (
              <SelectItem
                key={dayItem}
                value={dayItem}
                className="filterClass capitalize"
              >
                {dayItem}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Category Select */}
      <Select onValueChange={value => setCategoryId(Number(value))}>
        <SelectTrigger className="w-full py-5 rounded-[6px] px-4 text-base focus:ring-primary-orange">
          <SelectValue placeholder="Select a category..." />
        </SelectTrigger>
        <SelectContent className="px-0 py-0 border-transparent">
          {recipeCategory?.data?.map((item: categoryItem) => (
            <SelectItem key={item.id} value={item.id} className="filterClass">
              {item.category_name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Buttons */}
      <div className="pt-6 pb-3 flex items-center justify-center gap-3">
        <button
          disabled={isPending}
          onClick={handleAddPlan}
          className={`px-5 py-2.5 border border-primary-orange bg-primary-orange text-white rounded-md ${
            isPending ? "cursor-not-allowed opacity-90" : "cursor-pointer"
          }`}
        >
          {isPending ? (
            <span className="flex gap-2 items-center">
              <BiLoaderCircle className="animate-spin text-xl" />
              Please wait....
            </span>
          ) : (
            "Add to planner"
          )}
        </button>

        <button
          onClick={() => setOpen(false)}
          className="px-8 py-2.5 cursor-pointer border border-primary-orange text-primary-orange rounded-md"
        >
          Cancel
        </button>
      </div>
    </>
  );
};

export default AddMealModal;
