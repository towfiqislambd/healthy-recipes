"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import {
  getAllCategories,
  getAllRecipesPrivate,
  getAllRecipesPublic,
  getRecipeLibraryClient,
} from "@/Hooks/api/cms_api";
import React from "react";
import { useState } from "react";
import Image from "next/image";
import useAuth from "@/Hooks/useAuth";
import deleteImg from "@/Assets/images/delete.png";
import { RiResetLeftFill } from "react-icons/ri";
import RecipeCard from "@/Components/Cards/RecipeCard";
import Container from "@/Components/Common/Container";

const MealPlannerTabSection = () => {
  const { user, search } = useAuth();
  const [activeTab, setActiveTab] = useState<any>({
    id: 0,
    category_name: "All Recipes",
  });

  const [ageGroup, setAgeGroup] = useState<any>(null);
  const [library, setLibrary] = useState<any>(null);
  const { data: allCategories, isLoading: isAllCategoryLoading } =
    getAllCategories();
  const { data: recipeLibrary, isLoading: isRecipeLibraryLoading } =
    getRecipeLibraryClient();
  const { data: allRecipes, isLoading: loadingAllRecipe } = getAllRecipesPublic(
    {
      category_id: activeTab?.id,
      recipe_library_id: library,
      age_group: ageGroup,
      search,
    }
  );
  const { data: recipesPrivate, isLoading: privateRecipesLoading } =
    getAllRecipesPrivate(activeTab?.id, library as any, ageGroup, null, search);

  const isLoading =
    isAllCategoryLoading || isRecipeLibraryLoading || loadingAllRecipe;

  let recipeData = null;
  if (user) {
    recipeData = recipesPrivate;
  } else {
    recipeData = allRecipes;
  }

  const handleReset = () => {
    setAgeGroup(null);
    setLibrary(null);
    setActiveTab({ id: 0, category_name: "All Recipes" });
  };

  const handleAgeChange = (value: any) => {
    setAgeGroup(value === "all" ? null : value);
  };

  const handleDietChange = (value: any) => {
    setLibrary(value === "all" ? null : value);
  };

  return (
    <Container>
      <section className="py-5 3xl:py-12">
        <div className="lg:px-3 xl:px-5 2xl:px-10 3xl:px-0">
          {/* Tabs */}
          <div className="py-8 w-full flex flex-wrap items-center justify-center 2xl:justify-between gap-x-1 gap-y-2">
            <button
              onClick={() => setActiveTab({ category_name: "All Recipes" })}
              className={`px-4 2xl:px-6 2xl:py-3 py-2 rounded-full font-medium ${
                activeTab?.category_name === "All Recipes"
                  ? "bg-[#3A3A3A] text-white"
                  : "bg-transparent text-accent-gray"
              }`}
            >
              All Recipes
            </button>

            {allCategories?.data?.map((tab: any) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab)}
                className={`px-4 2xl:px-6 2xl:py-3 py-2 rounded-full font-medium ${
                  tab?.category_name === activeTab?.category_name
                    ? "bg-[#3A3A3A] text-white"
                    : "bg-transparent text-accent-gray"
                }`}
              >
                {tab?.category_name}
              </button>
            ))}
          </div>

          {/* Filters */}
          <div className="my-2 w-full md:w-[400px] lg:w-auto mx-auto border lg:border-none p-5 rounded-lg lg:p-0 3xl:py-12 flex flex-col lg:flex-row items-center justify-center gap-3 2xl:gap-5">
            <div className="flex flex-col lg:flex-row w-full lg:w-auto gap-3 lg:gap-0">
              {/* Age Filter */}
              <Select value={ageGroup || "all"} onValueChange={handleAgeChange}>
                <SelectTrigger className="w-full lg:w-[280px] xl:w-[300px] 2xl:w-[460px] h-11 2xl:h-14 lg:rounded-l-full lg:px-6 px-3 text-base focus:ring-primary-orange">
                  <SelectValue placeholder="Filter by age group" />
                </SelectTrigger>
                <SelectContent className="px-0 py-0">
                  <SelectItem value="all" className="filterClass">
                    Filter by age group
                  </SelectItem>
                  <SelectItem value="teen" className="filterClass">
                    Teen (13–19 years)
                  </SelectItem>
                  <SelectItem value="adult" className="filterClass">
                    Adult (20–39 years)
                  </SelectItem>
                  <SelectItem value="middle-adulthood" className="filterClass">
                    Middle adulthood (40–59 years)
                  </SelectItem>
                  <SelectItem value="senior-adult" className="filterClass">
                    Senior Adult (60+)
                  </SelectItem>
                </SelectContent>
              </Select>

              {/* Diet Filter */}
              <Select value={library || "all"} onValueChange={handleDietChange}>
                <SelectTrigger className="w-full lg:w-[280px] xl:w-[300px] 2xl:w-[450px] 2xl:h-14 h-11 lg:rounded-r-full lg:border-l-0 px-3 lg:px-6 text-base focus:ring-primary-orange">
                  <SelectValue placeholder="Filter by recipe library" />
                </SelectTrigger>
                <SelectContent className="px-0 py-0">
                  <SelectItem value="all" className="filterClass">
                    Filter by recipe library
                  </SelectItem>
                  {recipeLibrary?.data?.map((library: any) => (
                    <SelectItem
                      key={library.id}
                      value={library.id}
                      className="filterClass"
                    >
                      {library?.diet_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Reset Button */}
            <button
              onClick={handleReset}
              className="h-11 2xl:h-14 w-full lg:w-auto px-3 justify-center lg:px-6 border border-primary-orange rounded-full flex items-center gap-2 bg-primary-orange text-white transition-all duration-300 hover:bg-transparent hover:text-primary-orange"
            >
              <RiResetLeftFill />
              Reset
            </button>
          </div>

          {/* Recipe Cards */}
          <div className="mt-10 grid lg:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4 gap-6">
            {privateRecipesLoading || isLoading ? (
              "Loading"
            ) : recipeData?.data?.length > 0 ? (
              recipeData?.data?.map((item: any, idx: number) => (
                <RecipeCard
                  key={idx}
                  // isMyRecipe={true}
                  isPlanner={true}
                  item={item}
                />
              ))
            ) : (
              <div className="text-center col-span-4 py-5 space-y-4">
                <Image
                  src={deleteImg}
                  alt="logo"
                  width={10}
                  height={10}
                  className="mx-auto size-16 xl:size-auto"
                />
                <p className="text-primary font-merriweather text-lg lg:text-xl">
                  No recipes found
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </Container>
  );
};

export default MealPlannerTabSection;
