"use client";
import { getAllRecipesPublic } from "@/Hooks/api/cms_api";
import React from "react";

const AllRecipeTabs = () => {
  const { data: allRecipes, isLoading } = getAllRecipesPublic();
  console.log(allRecipes);

  return <div></div>;
};

export default AllRecipeTabs;
