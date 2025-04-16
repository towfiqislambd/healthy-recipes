import RecipeBlogs from "@/components/homepage/RecipeBlogs";
import ShareYourRecipeSection from "@/components/homepage/ShareYourRecipeSection";
import AllRecipeCardsSection from "@/components/recipe-library/AllRecipeCardsSection";
import { Link } from "react-router-dom";
import { useBlogs, useRecipeLibrary, useShareYourRecipe } from "@/hooks/cms.queries";

const RecipeLibrary = () => {
  const { data: recipeLibrary } = useRecipeLibrary();
  const { data: shareYourRecipe } = useShareYourRecipe();
  const { data: blogs } = useBlogs();

  return (
    <div className="mt-[100px] lg:mt-[134px]">
      {/* breadcrumbs */}
      <div className="container">
        <div className="lg:px-3 xl:px-5 2xl:px-10 3xl:px-0">
          <div className="flex items-center space-x-2">
            <Link
              to="/"
              className="text-[#8993A4] hover:text-primary leading-[130%] transition-all divide-blue-300"
            >
              Home
            </Link>
            <span className="text-gray-500"> {">"} </span>
            <Link
              to="/recipe-library"
              className="text-textColor hover:text-primary leading-[130%] transition-all divide-blue-300"
            >
              Recipe Library
            </Link>
          </div>
        </div>
      </div>

      {/* contents */}
      <div className="mt-3 lg:mt-5 3xl:mt-10 container lg:pb-10">
        <div className="lg:px-3 xl:px-5 2xl:px-10 3xl:px-0">
          {/* section title */}
          <h2 className="text-black text-xl lg:text-2xl xl:text-3xl 3xl:text-5xl font-bold leading-[130%]">
            All Recipe Library
          </h2>

          <AllRecipeCardsSection data={recipeLibrary} />
        </div>
      </div>

      <ShareYourRecipeSection data={shareYourRecipe} />

      <RecipeBlogs data={blogs} />
    </div>
  );
};

export default RecipeLibrary;
