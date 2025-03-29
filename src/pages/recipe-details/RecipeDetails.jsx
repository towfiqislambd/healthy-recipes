import LeftSideContentsDetailsPage from '@/components/recipe-details/LeftSideContentsDetailsPage';
import banner from '../../assets/images/jjj.jpg';
import CommonHeroBanner from '@/components/common/CommonHeroBanner';
import recipe from '../../assets/videos/recipe.mp4';
import RightSideContentsDetailsPage from '@/components/recipe-details/RightSideContentsDetailsPage';
import ShareRecipeSection from '@/components/recipe-details/ShareRecipeSection';
import ShareYourRecipeSection from '@/components/homepage/ShareYourRecipeSection';
import { EmptyStarSvg } from '@/components/svg-container/SvgContainer';
import ReviewSection from '@/components/recipe-details/ReviewSection';

const RecipeDetails = () => {
  return (
    <div className="mt-[104px]">
      {/* banner */}
      <CommonHeroBanner
        image={banner}
        title="Banana Oat Pancakes (Dairy-Free)"
      />

      {/* Main Container */}
      <section className="pb-20">
        {/* about recipe */}
        <div className="container flex w-full gap-24">
          {/* left side contents */}
          <LeftSideContentsDetailsPage />

          {/* right side contents */}
          <RightSideContentsDetailsPage video={recipe} />
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
