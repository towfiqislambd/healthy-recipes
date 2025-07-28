import AllRecipesTabs from "@/components/all-recipes/AllRecipesTabs";
import RecipeBlogs from "@/components/homepage/RecipeBlogs";
import ShareYourRecipeSection from "@/components/homepage/ShareYourRecipeSection";
import { Loader } from "@/components/loader/Loader";
import {
  useAllCategories,
  useAllRecipes,
  useBlogs,
  useShareYourRecipe,
} from "@/hooks/cms.queries";
import { Link, useParams } from "react-router-dom";

const AllRecipes = () => {
  const { id } = useParams();
  const { data: allCategories, isLoading: isLoadingCategories } =
    useAllCategories();
  const { data: shareYourRecipe, isLoading: isLoadingSharedRecipes } =
    useShareYourRecipe();
  const { data: blogs, isLoading: isLoadingBlogs } = useBlogs();
  const { data: allRecipes, isLoading: isLoadingRecipes } = useAllRecipes(
    null,
    id
  );

  const isLoading =
    isLoadingCategories ||
    isLoadingSharedRecipes ||
    isLoadingBlogs ||
    isLoadingRecipes;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

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

      {/* tabs */}
      <AllRecipesTabs
        libraryId={id}
        data={allCategories}
        recipes={allRecipes}
      />

      <ShareYourRecipeSection data={shareYourRecipe} />
      <RecipeBlogs data={blogs} />
    </div>
  );
};

export default AllRecipes;
