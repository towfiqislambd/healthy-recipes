import Hero from "@/Components/PageComponents/mainPages/homePageComponents/Hero";
import OurMealPlanner from "@/Components/PageComponents/mainPages/homePageComponents/OurMealPlanner";
import RecentBlogs from "@/Components/PageComponents/mainPages/homePageComponents/RecentBlogs";
import RecipeLibrary from "@/Components/PageComponents/mainPages/homePageComponents/RecipeLibrary";
import ShareYourMeal from "@/Components/PageComponents/mainPages/homePageComponents/ShareYourMeal";
import Testimonial from "@/Components/PageComponents/mainPages/homePageComponents/Testimonial";
import TrendingDiet from "@/Components/PageComponents/mainPages/homePageComponents/TrendingDiet";
import WhyChooseUs from "@/Components/PageComponents/mainPages/homePageComponents/WhyChooseUs";
import {
  getHeroData,
  getMealPlannerData,
  getRecentBLogs,
  getRecipeLibraryData,
  getShareRecipesData,
  getTestimonialData,
  getTrendingRecipesPublic,
  getWhyChooseData,
} from "@/Hooks/api/cms_api";

const Page = async () => {
  const heroData = await getHeroData();
  const whyChooseData = await getWhyChooseData();
  const recipeLibraryData = await getRecipeLibraryData();
  const mealPlannerData = await getMealPlannerData();
  const shareRecipesData = await getShareRecipesData();
  const testimonialData = await getTestimonialData();
  const recentBlogsData = await getRecentBLogs();
  const trendingRecipes = await getTrendingRecipesPublic();

  return (
    <>
      <Hero data={heroData?.data} />
      <WhyChooseUs data={whyChooseData?.data} />
      <TrendingDiet data={trendingRecipes?.data} />
      <RecipeLibrary data={recipeLibraryData?.data} />
      <OurMealPlanner data={mealPlannerData?.data} />
      <ShareYourMeal data={shareRecipesData?.data} />
      <Testimonial data={testimonialData?.data} />
      <RecentBlogs data={recentBlogsData?.data} />
    </>
  );
};

export default Page;
