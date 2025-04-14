import LeftSideContentsDetailsPage from "@/components/recipe-details/LeftSideContentsDetailsPage";
import CommonHeroBanner from "@/components/common/CommonHeroBanner";
import RightSideContentsDetailsPage from "@/components/recipe-details/RightSideContentsDetailsPage";
import ShareRecipeSection from "@/components/recipe-details/ShareRecipeSection";
import ShareYourRecipeSection from "@/components/homepage/ShareYourRecipeSection";
import ReviewSection from "@/components/recipe-details/ReviewSection";
import { useParams } from "react-router-dom";
import { useRecipeDetails } from "@/hooks/cms.queries";

const RecipeDetails = () => {
  const { id } = useParams();
  const fullLocation = `${window.location.origin}/${id}`
  const { data: recipeData } = useRecipeDetails(id);
  console.log(recipeData)

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
            <div className="">
              <LeftSideContentsDetailsPage data={recipeData} />
            </div>

            {/* right side contents */}
            <div className="">
              <RightSideContentsDetailsPage data={recipeData} />
            </div>
          </div>
        </div>

        {/* share */}
        <ShareRecipeSection fullLocation={fullLocation} />
      </section>

      <ShareYourRecipeSection />

      {/* review section */}
      <ReviewSection />
    </div>
  );
};

export default RecipeDetails;
