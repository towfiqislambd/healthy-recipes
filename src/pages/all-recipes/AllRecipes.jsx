import AllRecipesTabs from "@/components/all-recipes/AllRecipesTabs";
import RecipeBlogs from "@/components/homepage/RecipeBlogs";
import ShareYourRecipeSection from "@/components/homepage/ShareYourRecipeSection";
import { useAllCategories, useBlogs, useRecipesByLibraries, useShareYourRecipe } from "@/hooks/cms.queries";
import { Link, useParams } from "react-router-dom";

const AllRecipes = () => {
  const { id } = useParams();
  const { data: allCategories } = useAllCategories();
  const { data: shareYourRecipe } = useShareYourRecipe();
  const { data: blogs } = useBlogs();
  const { data: recipeLibrariesData } = useRecipesByLibraries(id);

  return (
    <div className="mt-[100px] lg:mt-[144px]">
      {/* breadcrumbs */}
      <div className="container">
        <div className="lg:px-3 xl:px-5 2xl:px-10 3xl:px-0">
          <div className="flex items-center space-x-1 md:space-x-2 text-sm md:text-base">
            <Link
              to="/"
              className="text-[#8993A4] hover:text-primary leading-[130%] transition-all divide-blue-300"
            >
              Home
            </Link>
            <span className="text-gray-500"> {">"} </span>
            <Link
              to="/recipe-library"
              className="text-[#8993A4] hover:text-primary leading-[130%] transition-all divide-blue-300"
            >
              All Recipe Library
            </Link>
            <span className="text-gray-500"> {">"} </span>
            <Link
              // to={`/recipe-library/${slug}`}
              className="text-textColor hover:text-primary leading-[130%] transition-all divide-blue-300"
            >
              {/* {recipeTitle} */}
            </Link>
          </div>
        </div>
      </div>

      {/* title */}
      <div className="mt-5 2xl:mt-7 container">
        <div className="lg:px-3 xl:px-5 2xl:px-10 3xl:px-0">
          <h2 className="text-xl lg:text-2xl 2xl:text-3xl 3xl:text-4xl font-merriweather font-bold leading-[130%] text-black">
            {/* {recipeTitle} */}
          </h2>
        </div>
      </div>

      {/* tabs */}
      <AllRecipesTabs data={allCategories} recipes={recipeLibrariesData} />

      <ShareYourRecipeSection data={shareYourRecipe} />
      <RecipeBlogs data={blogs} />
    </div>
  );
};

export default AllRecipes;
