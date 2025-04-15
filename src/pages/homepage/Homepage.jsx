import HomepageBanner from "@/components/homepage/HomepageBanner";
import OurMealPlanner from "@/components/homepage/OurMealPlanner";
import RecipeBlogs from "@/components/homepage/RecipeBlogs";
import RecipeLibrarySection from "@/components/homepage/RecipeLibrarySection";
import ShareYourRecipeSection from "@/components/homepage/ShareYourRecipeSection";
import Testimonials from "@/components/homepage/Testimonials";
import TrendingDiet from "@/components/homepage/TrendingDiet";
import WhyChooseUs from "@/components/homepage/WhyChooseUs";
import { useBlogs, useHomepageBanner, useOurMealPlanner, useRecipeLibrary, useShareYourRecipe, useTestimonial, useTrendingRecipes, useWhyChooseUs } from "@/hooks/cms.queries";

const Homepage = () => {
  const { data: homepageBanner } = useHomepageBanner();
  const { data: whyChooseUs } = useWhyChooseUs();
  const { data: ourMealPlanner } = useOurMealPlanner();
  const { data: shareYourRecipe } = useShareYourRecipe();
  const { data: testimonial } = useTestimonial();
  const { data: blogs } = useBlogs();
  const { data: recipeLibrary } = useRecipeLibrary();
  const { data: trendingRecipes } = useTrendingRecipes();

  return (
    <div className="mt-[80px] lg:mt-[104px]">
      <HomepageBanner data={homepageBanner} />
      <WhyChooseUs data={whyChooseUs} />
      <TrendingDiet data={trendingRecipes}/>
      <RecipeLibrarySection data={recipeLibrary} />
      <OurMealPlanner data={ourMealPlanner} />
      <ShareYourRecipeSection data={shareYourRecipe} />
      <Testimonials data={testimonial} />
      <RecipeBlogs data={blogs} />
    </div>
  );
};

export default Homepage;
