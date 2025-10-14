"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import React from "react";
import Image from "next/image";
import { useState } from "react";
import deleteImg from "@/Assets/images/delete.png";
import { RiResetLeftFill } from "react-icons/ri";
import RecipeCard from "@/Components/Cards/RecipeCard";
import { getAllRecipesPublic } from "@/Hooks/api/cms_api";
import { RecipeCardSkeleton } from "@/Components/Loader/Loader";

type Props = {
  library_id: number;
  recipes: any;
  allCategories: any;
};

const AllRecipeTabs = ({ recipes, allCategories, library_id }: Props) => {
  // States
  const [tag, setTag] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<any>({
    id: "",
    category_name: "All Recipes",
  });

  // Query
  const { data: allRecipes, isLoading } = getAllRecipesPublic({
    category_id: activeTab?.id,
    recipe_library_id: library_id,
    tag_id: tag,
  });

  // Func for count recipes
  const getCountByType = (type: string) => {
    if (!recipes?.data) return 0;
    return type === "All Recipes"
      ? recipes?.data?.length
      : recipes?.data?.filter((r: any) => r?.category_name === type)?.length ||
          0;
  };

  // Func for reset
  const handleReset = () => {
    setTag(null);
    setActiveTab({ id: 0, category_name: "All Recipes" });
  };

  // Func for tag change
  const handleTagChange = (value: any) => {
    setTag(value === "all" ? null : value);
  };

  // Get unique tags from all recipes
  const uniqueTags = Array.from(
    new Set(
      recipes?.data?.flatMap((recipe: any) =>
        recipe.tag_names?.map((tag: any) => ({
          id: tag?.id,
          tag_name: tag?.tag_name,
        }))
      )
    )
  );

  return (
    <section className="pb-7 xl:pb-10 2xl:pb-20">
      {/* Tabs */}
      <div className="py-5 sm:py-8 w-full flex flex-wrap items-center justify-center 3xl:justify-between gap-x-1 gap-y-2">
        <button
          onClick={() => setActiveTab({ id: 0, category_name: "All Recipes" })}
          className={`px-3 sm:px-4 2xl:px-6 2xl:py-3 py-2 cursor-pointer text-sm sm:text-base rounded-full font-medium ${
            activeTab?.category_name === "All Recipes"
              ? "bg-[#3A3A3A] text-white"
              : "bg-transparent text-accent-gray"
          }`}
        >
          All Recipes <span>({getCountByType("All Recipes")})</span>
        </button>

        {allCategories?.data?.map((tab: any) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab)}
            className={`px-3 sm:px-4 3xl:px-5 2xl:py-3 py-2 cursor-pointer text-sm sm:text-base rounded-full font-medium ${
              tab?.category_name === activeTab?.category_name
                ? "bg-[#3A3A3A] text-white"
                : "bg-transparent text-accent-gray"
            }`}
          >
            {tab?.category_name}
            <span>({getCountByType(tab?.category_name)})</span>
          </button>
        ))}
      </div>

      {/* Filter by tag names */}
      <div className="w-full flex flex-wrap items-center justify-center 2xl:justify-end gap-3 xl:gap-3 2xl:gap-5">
        <Select value={tag || "all"} onValueChange={handleTagChange}>
          <SelectTrigger className="w-[300px] md:w-[380px] 2xl:w-[450px] !h-9 sm:!h-11 2xl:!h-14 rounded-full px-4 2xl:px-6 text-base focus:ring-primary-orange">
            <SelectValue placeholder="Select recipes by tags..." />
          </SelectTrigger>
          <SelectContent className="px-0 py-0 border-transparent">
            <SelectItem
              value="all"
              className="text-sm lg:text-base !py-1.5 lg:!py-2 2xl:!py-3 px-3 xl:px-4 focus:bg-primary-orange font-poppins text-accent-gray focus:text-white cursor-pointer"
            >
              Select recipes by tags
            </SelectItem>

            {uniqueTags.map((tag: any) => (
              <SelectItem
                key={tag.id}
                value={tag.id}
                className="text-sm lg:text-base !py-1.5 lg:!py-2 2xl:!py-3 px-3 xl:px-4 focus:bg-primary-orange font-poppins text-accent-gray focus:text-white cursor-pointer"
              >
                {tag.tag_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <button
          onClick={handleReset}
          className="h-9 sm:h-11 2xl:h-14 px-3 2xl:px-6 border border-primary-orange rounded-full flex items-center gap-2 bg-primary-orange text-white transition-all duration-300 hover:bg-transparent hover:text-primary-orange cursor-pointer"
        >
          <RiResetLeftFill />
          Reset
        </button>
      </div>

      {/* Recipe Cards */}
      <div className="mt-10 grid lg:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4 gap-6">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <RecipeCardSkeleton key={index} />
          ))
        ) : allRecipes?.data?.length > 0 ? (
          allRecipes?.data?.map((item: any, idx: number) => (
            <RecipeCard key={idx} item={item} />
          ))
        ) : (
          <div className="text-center col-span-4 py-5 space-y-4">
            <figure className="relative mx-auto size-16 xl:size-auto">
              <Image src={deleteImg} fill alt="logo" className="size-full" />
            </figure>

            <p className="text-primary-orange font-merriweather text-lg lg:text-xl">
              No recipes found
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default AllRecipeTabs;
