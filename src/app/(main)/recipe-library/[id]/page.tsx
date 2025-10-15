import {
  getRecentBLogs,
  getRecipeCategories,
  getShareRecipesData,
} from "@/Hooks/api/cms_api";
import Link from "next/link";
import React from "react";
import Container from "@/Components/Common/Container";
import RecentBlogs from "@/Components/PageComponents/mainPages/homePageComponents/RecentBlogs";
import ShareYourMeal from "@/Components/PageComponents/mainPages/homePageComponents/ShareYourMeal";
import AllRecipes from "@/Components/PageComponents/mainPages/recipeLibraryComponents/AllRecipes";

const page = async ({ params }: any) => {
  const { id } = params;
  const shareRecipeData = await getShareRecipesData();
  const blogData = await getRecentBLogs();
  const categoryData = await getRecipeCategories();

  return (
    <section className="mt-12">
      <Container>
        {/* Breadcrumbs */}
        <div className="lg:px-3 xl:px-5 2xl:px-10 3xl:px-0 flex items-center space-x-1 md:space-x-2 text-sm md:text-base">
          <Link
            href="/"
            className="text-[#8993A4] hover:text-primary-orange leading-[130%] transition-all divide-blue-300"
          >
            Home
          </Link>

          <span className="text-gray-500"> {">"} </span>

          <Link
            href="/recipe-library"
            className="text-[#8993A4] hover:text-primary-orange leading-[130%] transition-all divide-blue-300"
          >
            All Recipe Library
          </Link>
        </div>

        {/* All Recipes */}
        <AllRecipes library_id={id} allCategories={categoryData} />
      </Container>

      <ShareYourMeal data={shareRecipeData?.data} />

      <RecentBlogs data={blogData?.data} />
    </section>
  );
};

export default page;
