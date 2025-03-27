import FavoriteRecipes from '@/components/homepage/FavoriteRecipes';
import HomepageBanner from '@/components/homepage/HomepageBanner';
import OurMealPlanner from '@/components/homepage/OurMealPlanner';
import RecipeLibrarySection from '@/components/homepage/RecipeLibrarySection';
import ShareYourRecipeSection from '@/components/homepage/ShareYourRecipeSection';
import TrendingDiet from '@/components/homepage/TrendingDiet';
import WhyChooseUs from '@/components/homepage/WhyChooseUs';

const Homepage = () => {
  return (
    <div className="mt-[104px]">
      <HomepageBanner />
      <WhyChooseUs />
      <TrendingDiet />
      <RecipeLibrarySection />
      <FavoriteRecipes />
      <OurMealPlanner />
      <ShareYourRecipeSection />
    </div>
  );
};

export default Homepage;
