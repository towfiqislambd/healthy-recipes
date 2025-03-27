import FavoriteRecipes from '@/components/homepage/FavoriteRecipes';
import HomepageBanner from '@/components/homepage/HomepageBanner';
import RecipeLibrarySection from '@/components/homepage/RecipeLibrarySection';
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
    </div>
  );
};

export default Homepage;
