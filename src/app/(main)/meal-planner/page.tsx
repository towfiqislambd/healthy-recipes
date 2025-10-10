import {
  getMealPlannerCard,
  getMealPlannerInfo,
  getRecentBLogs,
  getShareRecipesData,
} from "@/Hooks/api/cms_api";
import React from "react";
import MealPlannerTabSection from "@/Components/PageComponents/mainPages/mealPlannerPageComponents/MealPlannerTabSection";
import ShareYourMeal from "@/Components/PageComponents/mainPages/homePageComponents/ShareYourMeal";
import RecentBlogs from "@/Components/PageComponents/mainPages/homePageComponents/RecentBlogs";
import Container from "@/Components/Common/Container";
import Image from "next/image";

type mealItem = {
  title: string;
  description: string;
};

type cardItem = {
  title: string;
  image: string;
};

const page = async () => {
  const mealPlannerTitleAndDesc = await getMealPlannerInfo();
  const mealPlannerCard = await getMealPlannerCard();
  const shareRecipes = await getShareRecipesData();
  const recentBlogs = await getRecentBLogs();

  return (
    <section className="mt-12">
      <div className="pt-20 pb-6 text-center">
        <Container>
          {mealPlannerTitleAndDesc?.data?.map((item: mealItem, idx: number) => (
            <div key={idx} className="lg:px-3 xl:px-5 2xl:px-10 3xl:px-0">
              <h1 className="text-xl md:text-2xl xl:text-3xl 3xl:text-5xl font-merriweather font-bold text-primary-primary-black">
                {item?.title}
              </h1>
              <p className="pt-5 xl:pt-7 max-w-[912px] mx-auto sm:leading-[150%] text-[15px] sm:text-base text-accent-gray">
                {item?.description}
              </p>
            </div>
          ))}
        </Container>
      </div>

      <section className="py-10 bg-white">
        <Container>
          <div className="lg:px-3 grid xl:grid-cols-3 gap-7 xl:gap-10 2xl:gap-20">
            {mealPlannerCard?.data?.map((item: cardItem, idx: number) => (
              <div
                key={idx}
                className="flex flex-col items-center gap-1 text-center"
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_SITE_URL}/${item?.image}`}
                  alt="Card"
                  width={70}
                  height={70}
                />

                <h5 className="text-[#253858] md:text-lg 3xl:text-xl font-medium leading-[150%]">
                  {item?.title}
                </h5>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <MealPlannerTabSection />
      <ShareYourMeal data={shareRecipes?.data} />
      <RecentBlogs data={recentBlogs?.data} />
    </section>
  );
};

export default page;
