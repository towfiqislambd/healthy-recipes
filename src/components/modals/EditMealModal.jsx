import { useState } from "react";
import { DialogContent, DialogHeader } from "../ui/dialog";
import { useEditMealPlanner } from "@/hooks/cms.mutations";
import toast from "react-hot-toast";
import { CgSpinnerTwo } from "react-icons/cg";
import { useRecipeDetails } from "@/hooks/cms.queries";
import { Loader } from "@/components/loader/Loader";

const EditMealModal = ({ recipe, itemId, setOpen }) => {
  const [recipeRename, setRecipeRename] = useState("");
  const { data: recipeDetailsData, isLoading } = useRecipeDetails(
    recipe?.recipe_id
  );
  const { mutateAsync: editMealPlan, isPending } = useEditMealPlanner(itemId);

  const handleEditRecipe = () => {
    if (!recipeRename) {
      toast.error("Please write something before updating.");
      return;
    }
    const data = { name: recipeRename };
    editMealPlan(data);
    setOpen(false);
  };

  return (
    <DialogContent className={"max-w-lg font-inter"}>
      <DialogHeader>
        <>
          <label className="mb-3 font-poppins text-lg block font-medium text-[#5A5C5F]">
            Edit Recipe
          </label>
          {isLoading ? (
            <div className="py-3 w-fit mx-auto">
              <Loader />
            </div>
          ) : (
            <input
              type="text"
              defaultValue={
                recipe?.name ? recipe?.name : recipeDetailsData?.recipe_name
              }
              className="border rounded-[5px] px-3 py-2 sm:py-3 outline-none block w-full"
              placeholder="Write Something...."
              onChange={e => setRecipeRename(e.target.value)}
            />
          )}

          {/* buttons */}
          <div className="pt-3 sm:pt-6 pb-3 flex items-center justify-center gap-3">
            <button
              onClick={handleEditRecipe}
              className="px-3 sm:px-5 py-2 sm:py-2.5 border border-primary bg-primary text-white rounded-md"
            >
              {isPending ? (
                <CgSpinnerTwo className="animate-spin size-6" />
              ) : (
                "Update recipe"
              )}
            </button>

            <button
              onClick={() => setOpen(false)}
              className="px-4 sm:px-8 py-2 sm:py-2.5 border border-primary text-primary rounded-md"
            >
              Cancel
            </button>
          </div>
        </>
      </DialogHeader>
    </DialogContent>
  );
};

export default EditMealModal;
