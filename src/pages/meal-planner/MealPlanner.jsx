import MealPlannerStatsCard from '@/components/cards/MealPlannerStatsCard';
import RecipeBlogs from '@/components/homepage/RecipeBlogs';
import ShareYourRecipeSection from '@/components/homepage/ShareYourRecipeSection';
import MealPlannerTabSection from '@/components/meal-planner/MealPlannerTabSection';
import {
  useAllCategories,
  useAllRecipes,
  useBlogs,
  useMealPlannerCard,
  useMealPlannerTitleAndDesc,
  useShareYourRecipe,
} from '@/hooks/cms.queries';
import React from 'react';

const MealPlanner = () => {
  const { data: shareYourRecipe } = useShareYourRecipe();
  const { data: mealPlannerTitleAndDesc } = useMealPlannerTitleAndDesc();
  const { data: mealPlannerCard } = useMealPlannerCard();

  const {
    data: allCategories,
    isLoading: catLoading,
    isFetching: catFetching,
    isPending: catPending,
  } = useAllCategories();

  const {
    data: allRecipes,
    isLoading: recipeLoading,
    isFetching: recipeFetching,
    isPending: recipePending,
  } = useAllRecipes();

  const { data: blogs } = useBlogs();

  const isLoading = catLoading || catFetching || catPending || recipeLoading || recipeFetching || recipePending;

  if (isLoading) {
    return <p className="h-svh">loading....</p>;
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
            <p className="pt-5 xl:pt-7 max-w-[912px] mx-auto leading-[150%] text-textColor">
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
      <MealPlannerTabSection allCategories={allCategories} allRecipes={allRecipes} />

      <ShareYourRecipeSection data={shareYourRecipe} />

      <RecipeBlogs data={blogs} />
    </div>
  );
};

export default MealPlanner;
