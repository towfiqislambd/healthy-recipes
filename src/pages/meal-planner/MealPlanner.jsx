import MealPlannerStatsCard from '@/components/cards/MealPlannerStatsCard';
import RecipeBlogs from '@/components/homepage/RecipeBlogs';
import ShareYourRecipeSection from '@/components/homepage/ShareYourRecipeSection';
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
    <div className="mt-[104px]">
      {/* title */}
      <section className="container pt-20 text-center">
        <h1 className="text-5xl font-merriweather font-bold text-black">
          Meal Planning by Age Group
        </h1>
        <p className="pt-7 max-w-[912px] mx-auto leading-[150%] text-textColor">
          A revolutionary approach to meal planning. Cutting-edge organization
          tools crafted to save time and tailor your weekly menu to your dietary
          preferences and habits. A game-changing 3-step meal planning process
          for effortless simplicity. All fueled by our extensive collection of
          3,000+ recipes.
        </p>
      </section>

      {/* stats */}
      <section className="py-10 bg-white">
        <div className="container grid grid-cols-3 gap-20">
          {mealPlannerStats?.map((item) => (
            <MealPlannerStatsCard key={item?.id} item={item} />
          ))}
        </div>
      </section>

      <ShareYourRecipeSection />

      <RecipeBlogs />
    </div>
  );
};

export default MealPlanner;
