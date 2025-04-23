import HomepageBanner from "@/components/homepage/HomepageBanner";
import OurMealPlanner from "@/components/homepage/OurMealPlanner";
import RecipeBlogs from "@/components/homepage/RecipeBlogs";
import RecipeLibrarySection from "@/components/homepage/RecipeLibrarySection";
import ShareYourRecipeSection from "@/components/homepage/ShareYourRecipeSection";
import Testimonials from "@/components/homepage/Testimonials";
import TrendingDiet from "@/components/homepage/TrendingDiet";
import WhyChooseUs from "@/components/homepage/WhyChooseUs";
import { Loader } from "@/components/loader/Loader";
import { useBlogs, useHomepageBanner, useOurMealPlanner, useRecipeLibrary, useShareYourRecipe, useTestimonial, useTrendingRecipePrivate, useTrendingRecipes, useWhyChooseUs } from "@/hooks/cms.queries";
import useAuth from "@/hooks/useAuth";

const Homepage = () => {
  const { user } = useAuth();
  const { data: homepageBanner, isLoading: isHomepageBannerLoading } = useHomepageBanner();
  const { data: whyChooseUs, isLoading: isWhyChooseUsLoading } = useWhyChooseUs();
  const { data: ourMealPlanner, isLoading: isOurMealPlannerLoading } = useOurMealPlanner();
  const { data: shareYourRecipe, isLoading: isShareYourRecipeLoading } = useShareYourRecipe();
  const { data: testimonial, isLoading: isTestimonialLoading } = useTestimonial();
  const { data: blogs, isLoading: isBlogsLoading } = useBlogs();
  const { data: recipeLibrary, isLoading: isRecipeLibraryLoading } = useRecipeLibrary();
  const { data: trendingRecipes, isLoading: isTrendingRecipesLoading } = useTrendingRecipes();
  const { data: trendingRecipesPrivate, refetch, isLoading: trendingLoading } = useTrendingRecipePrivate();

  const isLoading =
    isHomepageBannerLoading ||
    isWhyChooseUsLoading ||
    isOurMealPlannerLoading ||
    isShareYourRecipeLoading ||
    isTestimonialLoading ||
    isBlogsLoading ||
    isRecipeLibraryLoading ||
    isTrendingRecipesLoading 

  if (isLoading) {
    document.body.style.overflow = 'hidden';
    return <div className="h-screen flex justify-center items-center"><Loader /></div>;
  }
  else {
    document.body.style.overflow = '';
  }

  let trendingData = null;
  if (user) {
    trendingData = trendingRecipesPrivate;
  }
  else {
    trendingData = trendingRecipes;
  }

  return (
    <div className="mt-[80px] lg:mt-[104px]">
      <HomepageBanner data={homepageBanner} />
      <WhyChooseUs data={whyChooseUs} />
      <TrendingDiet data={trendingData} refetch={refetch} trendingLoading={trendingLoading}/>
      <RecipeLibrarySection data={recipeLibrary} />
      <OurMealPlanner data={ourMealPlanner} />
      <ShareYourRecipeSection data={shareYourRecipe} />
      <Testimonials data={testimonial} />
      <RecipeBlogs data={blogs} />
    </div>
  );
};

export default Homepage;
