"use client";
import React from "react";
import { getMealPlannerCard, getMealPlannerInfo } from "@/Hooks/api/cms_api";
import MealPlannerTabSection from "@/Components/PageComponents/mainPages/mealPlannerPageComponents/MealPlannerTabSection";

const page = () => {
  const { data: mealPlannerTitleAndDesc, isLoading } = getMealPlannerInfo();
  const { data: mealPlannerCard, isLoading: loadingMealPlannerCard } =
    getMealPlannerCard();

  return (
    <div className="mt-10 md:mt-[70px] 3xl:mt-[104px]">
      {/* title And Desc */}
      <section className="container pt-20 pb-6 text-center">
        {mealPlannerTitleAndDesc?.data?.map((item: any, idx: number) => (
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
            {mealPlannerCard?.data?.map((item: any, idx: number) => (
              <div
                key={idx}
                className="flex flex-col items-center gap-1 text-center"
              >
                <img
                  src={`${process.env.NEXT_PUBLIC_SITE_URL}/${item?.image}`}
                  alt="Card"
                />
                <h5 className="text-[#253858] md:text-lg 3xl:text-xl font-medium leading-[150%]">
                  {item?.title}
                </h5>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* tab section */}
      <MealPlannerTabSection />

      {/* <ShareYourRecipeSection data={shareYourRecipe} /> */}
      {/* <RecipeBlogs data={blogs} /> */}
    </div>
  );
};

export default page;
