import {
  getRecentBLogs,
  getRecipeLibraryData,
  getShareRecipesData,
} from "@/Hooks/api/cms_api";
import Link from "next/link";
import React from "react";
import RecipeCategoryCard from "@/Components/Cards/RecipeCategoryCard";
import Container from "@/Components/Common/Container";
import RecentBlogs from "@/Components/PageComponents/mainPages/homePageComponents/RecentBlogs";
import ShareYourMeal from "@/Components/PageComponents/mainPages/homePageComponents/ShareYourMeal";

type libraryItem = {
  id: number;
  diet_name: string;
  image: string;
  status: string;
  recipes_count: number;
};

const page = async () => {
  const recipeLibrary = await getRecipeLibraryData();
  const shareRecipeData = await getShareRecipesData();
  const blogData = await getRecentBLogs();

  return (
    <section className="mt-[100px] lg:mt-[134px]">
      <Container>
        {/* Breadcrumbs */}
        <div className="lg:px-3 xl:px-5 2xl:px-10 3xl:px-0">
          <div className="flex items-center space-x-2">
            <Link
              href="/"
              className="text-[#8993A4] hover:text-primary-orange leading-[130%] transition-all divide-blue-300"
            >
              Home
            </Link>

            <span className="text-gray-500"> {">"} </span>
            <Link
              href="/recipe-library"
              className="text-accent-gray hover:text-primary-orange leading-[130%] transition-all divide-blue-300"
            >
              Recipe Library
            </Link>
          </div>
        </div>

        {/* All Libraries */}
        <div className="mt-3 lg:mt-5 3xl:mt-10 lg:pb-10">
          <div className="lg:px-3 xl:px-5 2xl:px-10 3xl:px-0">
            {/* Title */}
            <h2 className="text-primary-black text-xl lg:text-2xl xl:text-3xl 3xl:text-5xl font-bold leading-[130%]">
              All Recipe Library
            </h2>

            {/* Library */}
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 pt-7 lg:pb-10 space-y-5">
              {recipeLibrary?.data?.map((item: libraryItem, idx: number) => (
                <RecipeCategoryCard key={idx} item={item} />
              ))}
            </div>
          </div>
        </div>
      </Container>

      {/* Share Recipes */}
      <ShareYourMeal data={shareRecipeData?.data} />

      {/* Blogs */}
      <RecentBlogs data={blogData?.data} />
    </section>
  );
};

export default page;
