import Container from "@/Components/Common/Container";
import RecentBlogs from "@/Components/PageComponents/mainPages/homePageComponents/RecentBlogs";
import ShareYourMeal from "@/Components/PageComponents/mainPages/homePageComponents/ShareYourMeal";
import AllRecipeTabs from "@/Components/PageComponents/mainPages/recipeLibraryComponents/AllRecipeTabs";

import {
  getAllCategories,
  getRecentBLogs,
  getShareRecipesData,
} from "@/Hooks/api/cms_api";
import Link from "next/link";
import React from "react";

const page = async ({ params }: any) => {
  const { id } = await params;
  console.log(id);
  const categoriesData = await getAllCategories();
  const shareRecipeData = await getShareRecipesData();
  const blogData = await getRecentBLogs();

  return (
    <div className="mt-[100px] lg:mt-[144px]">
      <Container>
        <div className="lg:px-3 xl:px-5 2xl:px-10 3xl:px-0">
          <div className="flex items-center space-x-1 md:space-x-2 text-sm md:text-base">
            <Link
              href="/"
              className="text-[#8993A4] hover:text-primary leading-[130%] transition-all divide-blue-300"
            >
              Home
            </Link>
            <span className="text-gray-500"> {">"} </span>
            <Link
              href="/recipe-library"
              className="text-[#8993A4] hover:text-primary leading-[130%] transition-all divide-blue-300"
            >
              All Recipe Library
            </Link>
            <span className="text-gray-500"> {">"} </span>
            {/* <Link
              href={`/recipe-library/${slug}`}
              className="text-textColor hover:text-primary leading-[130%] transition-all divide-blue-300"
            >
              {recipeTitle}
            </Link> */}
          </div>
        </div>
      </Container>
      <AllRecipeTabs />
      <ShareYourMeal data={shareRecipeData?.data} />
      <RecentBlogs data={blogData?.data} />
    </div>
  );
};

export default page;
