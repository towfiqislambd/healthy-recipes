import FavoriteRecipes from "@/components/homepage/FavoriteRecipes";
import HomepageBanner from "@/components/homepage/HomepageBanner";
import OurMealPlanner from "@/components/homepage/OurMealPlanner";
import RecipeBlogs from "@/components/homepage/RecipeBlogs";
import RecipeLibrarySection from "@/components/homepage/RecipeLibrarySection";
import ShareYourRecipeSection from "@/components/homepage/ShareYourRecipeSection";
import Testimonials from "@/components/homepage/Testimonials";
import TrendingDiet from "@/components/homepage/TrendingDiet";
import WhyChooseUs from "@/components/homepage/WhyChooseUs";

const Homepage = () => {
  return (
    <div className="mt-[80px] lg:mt-[104px]">
      <HomepageBanner />
      <WhyChooseUs />
      <TrendingDiet />
      <RecipeLibrarySection />
      <FavoriteRecipes />
      <OurMealPlanner />{/*
      <ShareYourRecipeSection />
      <Testimonials />
      <RecipeBlogs /> */}
    </div>
  );
};

export default Homepage;
