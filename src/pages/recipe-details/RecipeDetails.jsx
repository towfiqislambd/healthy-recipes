import LeftSideContentsDetailsPage from "@/components/recipe-details/LeftSideContentsDetailsPage";
import banner from "../../assets/images/jjj.jpg";
import CommonHeroBanner from "@/components/common/CommonHeroBanner";
import recipe from "../../assets/videos/recipe.mp4";
import RightSideContentsDetailsPage from "@/components/recipe-details/RightSideContentsDetailsPage";
import ShareRecipeSection from "@/components/recipe-details/ShareRecipeSection";
import ShareYourRecipeSection from "@/components/homepage/ShareYourRecipeSection";
import ReviewSection from "@/components/recipe-details/ReviewSection";

const RecipeDetails = () => {
  return (
    <div className="mt-[104px]">
      {/* banner */}
      <CommonHeroBanner
        image={banner}
        title="Banana Oat Pancakes (Dairy-Free)"
      />

      {/* Main Container */}
      <section className="lg:pb-20 md:pb-10">
        {/* about recipe */}
        <div className="container">
          <div className="flex w-full gap-14 2xl:gap-24 lg:px-3 xl:px-5 2xl:px-10 3xl:px-0">
            {/* left side contents */}
            <LeftSideContentsDetailsPage />

            {/* right side contents */}
            <RightSideContentsDetailsPage video={recipe} />
          </div>
        </div>

        {/* share */}
        <ShareRecipeSection />
      </section>

      <ShareYourRecipeSection />

      {/* review section */}
      <ReviewSection />
    </div>
  );
};

export default RecipeDetails;
