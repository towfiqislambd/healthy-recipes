import MealPlannerStatsCard from '@/components/cards/MealPlannerStatsCard';
import RecipeBlogs from '@/components/homepage/RecipeBlogs';
import ShareYourRecipeSection from '@/components/homepage/ShareYourRecipeSection';
import MealPlannerTabSection from '@/components/meal-planner/MealPlannerTabSection';
import {
  ChooseMealPlanSvg,
  MealPlannerPlanSvg,
  MealPlannerTableSvg,
} from '@/components/svg-container/SvgContainer';
import React from 'react';

const MealPlanner = () => {
  const mealPlannerStats = [
    {
      id: 1,
      svg: <ChooseMealPlanSvg />,
      title: 'Choose your meals by age group',
    },
    {
      id: 2,
      svg: <MealPlannerTableSvg />,
      title: 'Add to the meal planner',
    },
    {
      id: 3,
      svg: <MealPlannerPlanSvg />,
      title: 'Download or share your meal plan',
    },
  ];
  return (
    <div className="mt-10 md:mt-[70px] 3xl:mt-[104px]">
      {/* title */}
      <section className="container pt-20 pb-6 text-center">
        <div className="lg:px-3 xl:px-5 2xl:px-10 3xl:px-0">
          <h1 className="text-xl md:text-2xl xl:text-3xl 3xl:text-5xl font-merriweather font-bold text-black">
            Meal Planning by Age Group
          </h1>
          <p className="pt-5 xl:pt-7 max-w-[912px] mx-auto leading-[150%] text-textColor">
            A revolutionary approach to meal planning. Cutting-edge organization
            tools crafted to save time and tailor your weekly menu to your dietary
            preferences and habits. A game-changing 3-step meal planning process
            for effortless simplicity. All fueled by our extensive collection of
            3,000+ recipes.
          </p>
        </div>
      </section>

      {/* stats */}
      <section className="py-10 bg-white">
        <div className="container">
          <div className="lg:px-3 grid xl:grid-cols-3 gap-7 xl:gap-10 2xl:gap-20">
            {mealPlannerStats?.map((item) => (
              <MealPlannerStatsCard key={item?.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* tab section */}
      <MealPlannerTabSection />

      <ShareYourRecipeSection />

      <RecipeBlogs />
    </div>
  );
};

export default MealPlanner;
