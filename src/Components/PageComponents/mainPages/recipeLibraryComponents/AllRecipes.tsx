"use client";
import React from "react";
import AllRecipeTabs from "./AllRecipeTabs";
import { getAllRecipesPublic } from "@/Hooks/api/cms_api";

type Props = {
  library_id: number;
  allCategories: any;
};

const AllRecipes = ({ library_id, allCategories }: Props) => {
  const { data: allRecipes } = getAllRecipesPublic({
    recipe_library_id: library_id,
  });

  return (
    <AllRecipeTabs
      recipes={allRecipes}
      allCategories={allCategories}
      library_id={library_id}
    />
  );
};

export default AllRecipes;
