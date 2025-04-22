import LeftSideContentsDetailsPage from "@/components/recipe-details/LeftSideContentsDetailsPage";
import CommonHeroBanner from "@/components/common/CommonHeroBanner";
import RightSideContentsDetailsPage from "@/components/recipe-details/RightSideContentsDetailsPage";
import ShareRecipeSection from "@/components/recipe-details/ShareRecipeSection";
import ShareYourRecipeSection from "@/components/homepage/ShareYourRecipeSection";
import ReviewSection from "@/components/recipe-details/ReviewSection";
import { useParams } from "react-router-dom";
import { useRecipeDetails, useShareYourRecipe } from "@/hooks/cms.queries";
import { Loader } from "@/components/loader/Loader";

const RecipeDetails = () => {
  const { id } = useParams();
  const fullLocation = `${window.location.origin}/${id}`;
  const { data: shareYourRecipe, isLoading: shareRecipeLoading } = useShareYourRecipe();
  const { data: recipeData, isLoading: recipeDataLoading } = useRecipeDetails(id);

  if (shareRecipeLoading || recipeDataLoading) {
    return <div className="h-screen flex justify-center items-center"><Loader /></div>;
  }

  return (
    <div className="mt-[104px]">
      {/* banner */}
      <CommonHeroBanner
        image={`${import.meta.env.VITE_SITE_URL}/${recipeData?.recipe_image}`}
        title={recipeData?.recipe_name}
      />

      {/* Main Container */}
      <section className="pb-8 xl:pb-10 2xl:pb-20">
        {/* about recipe */}
        <div className="container">
          <div className="flex flex-col xl:flex-row w-full gap-5 lg:gap-8 xl:gap-14 2xl:gap-24 lg:px-3 xl:px-5 2xl:px-10 3xl:px-0">
            {/* left side contents */}
            <div className="w-[400px]">
              <LeftSideContentsDetailsPage data={recipeData} />
            </div>

            {/* right side contents */}
            <div className="flex-grow">
              <RightSideContentsDetailsPage data={recipeData} />
            </div>
          </div>
        </div>

        {/* share */}
        <ShareRecipeSection fullLocation={fullLocation} />
      </section>

      <ShareYourRecipeSection data={shareYourRecipe} />

      {/* review section */}
      <ReviewSection id={id} />
    </div>
  );
};

export default RecipeDetails;
