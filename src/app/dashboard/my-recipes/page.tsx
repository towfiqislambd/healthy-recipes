"use client";
import Image from "next/image";
import React, { useState } from "react";
import { recipeItem } from "@/Types/type";
import deleteImg from "@/Assets/images/delete.png";
import RecipeCard from "@/Components/Cards/RecipeCard";
import { RecipeCardSkeleton } from "@/Components/Loader/Loader";
import { getAllCategories, getMyRecipes } from "@/Hooks/api/cms_api";

type categoryItem = {
  id: number;
  category_name: string;
};

const page = () => {
  const [activeTab, setActiveTab] = useState({
    id: 0,
    category_name: "All Recipes",
  });
  const [activePage, setActivePage] = useState<number>(1);
  const { data: allCategories, isLoading: categoryLoading } =
    getAllCategories();
  const { data: myRecipes, isLoading: myRecipeLoading } = getMyRecipes(
    activePage,
    activeTab?.id
  );

  return (
    <section className="3xl:p-5">
      <h3 className="text-xl 2xl:text-2xl text-[#E48E19] font-semibold font-merriweather">
        Your shared recipes
      </h3>

      {/* Tabs */}
      <div className="py-5 2xl:py-8 w-full flex flex-wrap items-center justify-center 2xl:justify-between gap-x-1 gap-y-2">
        <button
          onClick={() => setActiveTab({ id: 0, category_name: "All Recipes" })}
          className={`cursor-pointer px-3 sm:px-4 3xl:px-6 py-[5px] text-[15px] sm:text-base sm:py-2 3xl:py-3 rounded-full font-medium ${
            activeTab?.category_name === "All Recipes"
              ? "bg-[#3A3A3A] text-white"
              : "bg-transparent text-accent-gray"
          }`}
        >
          All Recipes
        </button>

        {categoryLoading
          ? Array.from({ length: 7 }).map((_, index) => (
              <button
                className="px-4 sm:px-8 3xl:px-16 py-5 rounded-full font-medium bg-gray-200 animate-pulse"
                key={index}
              />
            ))
          : allCategories?.data?.map((tab: categoryItem) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab)}
                className={`cursor-pointer px-3 sm:px-4 3xl:px-6 py-[5px] text-[15px] sm:text-base sm:py-2 3xl:py-3 rounded-full font-medium ${
                  tab?.category_name === activeTab?.category_name
                    ? "bg-[#3A3A3A] text-white"
                    : "bg-transparent text-accent-gray"
                }`}
              >
                {tab?.category_name}
              </button>
            ))}
        {}
      </div>

      {/* Recipe Cards */}
      <div className="grid md:grid-cols-2 2xl:grid-cols-3 4xl:grid-cols-4 gap-5">
        {myRecipeLoading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <RecipeCardSkeleton key={index} />
          ))
        ) : myRecipes?.data?.recipes?.data?.length > 0 ? (
          myRecipes?.data?.recipes?.data?.map(
            (item: recipeItem, idx: number) => (
              <RecipeCard key={idx} item={item} />
            )
          )
        ) : (
          <div className="text-center col-span-4 py-6 space-y-3">
            <Image src={deleteImg} alt="logo" className="mx-auto size-16" />
            <p className="text-primary-orange font-merriweather md:text-lg">
              No shared recipes found
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="mt-10 flex justify-center items-center gap-2 flex-wrap">
        {myRecipes?.data?.recipes?.links.map((item: any, idx: number) => (
          <button
            key={idx}
            onClick={() => item.url && setActivePage(item.url.split("=")[1])}
            className={`px-3 py-1 rounded border transition-all duration-150 
            ${
              item.active
                ? "bg-primary-orange text-white"
                : "bg-white text-gray-700"
            } 
            ${!item.url ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
            disabled={!item.url}
            dangerouslySetInnerHTML={{ __html: item.label }}
          />
        ))}
      </div>
    </section>
  );
};

export default page;
