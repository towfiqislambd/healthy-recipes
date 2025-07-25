import MealPlannerStatsCard from '@/components/cards/MealPlannerStatsCard';
import RecipeBlogs from '@/components/homepage/RecipeBlogs';
import ShareYourRecipeSection from '@/components/homepage/ShareYourRecipeSection';
import { Loader } from '@/components/loader/Loader';
import MealPlannerTabSection from '@/components/meal-planner/MealPlannerTabSection';
import {
  useBlogs,
  useMealPlannerCard,
  useMealPlannerTitleAndDesc,
  useShareYourRecipe,
} from '@/hooks/cms.queries';

const MealPlanner = () => {
  const { data: shareYourRecipe, isLoading: loadingShareYourRecipe } = useShareYourRecipe();
  const { data: mealPlannerTitleAndDesc, isLoading: loadingMealPlannerTitleAndDesc } = useMealPlannerTitleAndDesc();
  const { data: mealPlannerCard, isLoading: loadingMealPlannerCard } = useMealPlannerCard();
  const { data: blogs, isLoading: loadingBlogs } = useBlogs();

  const isLoading =
    loadingShareYourRecipe ||
    loadingMealPlannerTitleAndDesc ||
    loadingMealPlannerCard ||
    loadingBlogs

  if (isLoading) {
    document.body.style.overflow = 'hidden';
    return <div className="h-screen flex justify-center items-center"><Loader /></div>;
  }
  else {
    document.body.style.overflow = '';
  }

  return (
    <div className="mt-10 md:mt-[70px] 3xl:mt-[104px]">
      {/* title And Desc */}
      <section className="container pt-20 pb-6 text-center">
        {mealPlannerTitleAndDesc?.map((item, idx) => (
          <div key={idx} className="lg:px-3 xl:px-5 2xl:px-10 3xl:px-0">
            <h1 className="text-xl md:text-2xl xl:text-3xl 3xl:text-5xl font-merriweather font-bold text-black">
              {item?.title}
            </h1>
            <p className="pt-5 xl:pt-7 max-w-[912px] mx-auto sm:leading-[150%] text-[15px] sm:text-base text-textColor">
              {item?.description}
            </p>
          </div>
        ))}
      </section>

      {/* stats */}
      <section className="py-10 bg-white">
        <div className="container">
          <div className="lg:px-3 grid xl:grid-cols-3 gap-7 xl:gap-10 2xl:gap-20">
            {mealPlannerCard?.map((item, idx) => (
              <MealPlannerStatsCard key={idx} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* tab section */}
      <MealPlannerTabSection />

      <ShareYourRecipeSection data={shareYourRecipe} />

      <RecipeBlogs data={blogs} />
    </div>
  );
};

export default MealPlanner;
