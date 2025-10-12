"use client";
import toast from "react-hot-toast";
import React, { useState } from "react";
import { BiLoaderCircle } from "react-icons/bi";
import { useEditMealPlanner } from "@/Hooks/api/cms_api";

type Recipe = {
  id: number;
  recipe_id: number;
  name: string;
  recipe: {
    recipe_name: string;
  };
};

interface mealProps {
  recipe: Recipe | null;
  itemId: number | null;
  setOpen: any;
}

const EditMealModal = ({ recipe, itemId, setOpen }: mealProps) => {
  // States
  const [recipeRename, setRecipeRename] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Query & Mutation
  const { mutateAsync: editMealPlan, isPending } = useEditMealPlanner(itemId);

  // Func for edit recipe
  const handleEditRecipe = () => {
    setErrorMessage("");
    if (!recipeRename) {
      return setErrorMessage("Please write something before updating.");
    }
    const payload = { name: recipeRename };
    editMealPlan(payload, {
      onSuccess: (data: any) => {
        if (data?.success) {
          toast.success(data?.message);
          setOpen(false);
        }
      },
    });
  };

  return (
    <>
      <label className="mb-3 font-poppins text-lg block font-medium text-[#5A5C5F]">
        Edit Recipe
      </label>

      {/* Dynamic Error Message */}
      {errorMessage && (
        <div className="my-4 p-3 bg-red-500/10 border border-red-500 rounded text-red-500 text-sm">
          {errorMessage}
        </div>
      )}

      <input
        type="text"
        defaultValue={recipe?.name ? recipe?.name : recipe?.recipe?.recipe_name}
        className="border border-gray-300 rounded-[6px] px-3 py-2 sm:py-3 outline-none block w-full"
        placeholder="Write Something...."
        onChange={e => setRecipeRename(e.target.value)}
      />

      {/* buttons */}
      <div className="pt-3 sm:pt-6 pb-3 flex items-center justify-center gap-3">
        <button
          disabled={isPending}
          onClick={handleEditRecipe}
          className={`px-3 sm:px-5 py-2 sm:py-2.5 border border-primary-orange bg-primary-orange text-white rounded-md ${
            isPending ? "cursor-not-allowed opacity-90" : "cursor-pointer"
          }`}
        >
          {isPending ? (
            <span className="flex gap-2 items-center">
              <BiLoaderCircle className="animate-spin text-xl" />
              Please wait....
            </span>
          ) : (
            "Update recipe"
          )}
        </button>

        <button
          onClick={() => setOpen(false)}
          className="px-4 sm:px-8 py-2 sm:py-2.5 border border-primary-orange text-primary-orange rounded-md cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </>
  );
};

export default EditMealModal;
