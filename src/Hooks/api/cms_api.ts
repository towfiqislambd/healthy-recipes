import { useServerApi } from "@/Hooks/useServerApi";
import useClientApi from "@/Hooks/useClientApi";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

// =======================================================
//  CSR (Client Side Rendering)
// =======================================================

// Get All Recipes Public
export const getAllRecipesPublic = (
  category_id?: number,
  recipe_library_id?: number,
  age_group?: number | any,
  tag_id?: number | any,
  search?: string
) => {
  return useClientApi({
    method: "get",
    key: [
      "all-recipes-public",
      category_id,
      recipe_library_id,
      age_group,
      tag_id,
      search,
    ],
    endpoint: "/api/guest/recipes",
    params: { category_id, recipe_library_id, age_group, tag_id, search },
    queryOptions: {
      retry: false,
    },
  });
};

// Get All Recipes Private
export const getAllRecipesPrivate = (
  category_id?: number,
  recipe_library_id?: number,
  age_group?: number | any,
  tag_id?: number | any,
  search?: string
) => {
  return useClientApi({
    method: "get",
    isPrivate: true,
    key: [
      "all-recipes-public",
      category_id,
      recipe_library_id,
      age_group,
      tag_id,
      search,
    ],
    endpoint: "/api/auth/recipes",
    params: { category_id, recipe_library_id, age_group, tag_id, search },
    queryOptions: {
      retry: false,
    },
  });
};

// Add-Remove Wishlist
export const useWishlist = (id: number) => {
  const queryClient = useQueryClient();
  return useClientApi({
    method: "post",
    key: ["add-remove-wishlist", id],
    isPrivate: true,
    endpoint: `/api/wishlist/${id}`,
    onSuccess: (data: any) => {
      // queryClient.invalidateQueries(["get-wishlists"]);
      if (data.length === 0) {
        toast.success("Removed from favorites");
      } else {
        toast.success("Added to favorites");
      }
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message);
    },
  });
};

// Add Review
export const useAddReview = (id: number) => {
  const queryClient = useQueryClient();
  return useClientApi({
    method: "post",
    key: ["add-review", id],
    isPrivate: true,
    endpoint: `/api/review/${id}`,
    onSuccess: (data: any) => {
      // queryClient.invalidateQueries(["get-wishlists"]);
      toast.success(data?.message);
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message);
    },
  });
};

// Delete Meal Planner
export const useDeleteMealPlanner = (meal_plan_id: number | null) => {
  const queryClient = useQueryClient();
  return useClientApi({
    method: "post",
    enabled: !!meal_plan_id,
    key: ["delete-meal-planner", meal_plan_id],
    isPrivate: true,
    endpoint: `/api/meal/${meal_plan_id}`,
    onSuccess: (data: any) => {
      // queryClient.invalidateQueries(["get-wishlists"]);
      toast.success(data?.message);
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message);
    },
  });
};

// Edit Meal Planner
export const useEditMealPlanner = (meal_plan_id: number | null) => {
  const queryClient = useQueryClient();
  return useClientApi({
    method: "post",
    enabled: !!meal_plan_id,
    key: ["edit-meal-planner", meal_plan_id],
    isPrivate: true,
    endpoint: `/api/meal-update/${meal_plan_id}`,
    onSuccess: (data: any) => {
      // queryClient.invalidateQueries(["get-wishlists"]);
      toast.success(data?.message);
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message);
    },
  });
};

// Add New Recipe
export const useAddNewRecipe = () => {
  return useClientApi({
    method: "post",
    key: ["add-new-recipe"],
    isPrivate: true,
    endpoint: "/api/recipe/store",
    onSuccess: (data: any) => {
      // queryClient.invalidateQueries(["get-wishlists"]);
      toast.success(data?.message);
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message);
    },
  });
};

// =======================================================
//  SSR (Server Side Rendering)
// =======================================================

// Site Settings
export async function getSiteSettings() {
  return useServerApi("/api/site-settings", 3600);
}

// Social Links
export async function getSocialLinks() {
  return useServerApi("/api/social-links", 3600);
}

// Hero Data
export async function getHeroData() {
  return useServerApi("/api/cms/home-banner", 3600);
}

// Why Choose Data
export async function getWhyChooseData() {
  return useServerApi("/api/cms/why-choose-us", 3600);
}

// Meal Planner Data
export async function getMealPlannerData() {
  return useServerApi("/api/cms/meal-planner", 3600);
}

// Share Recipes Data
export async function getShareRecipesData() {
  return useServerApi("/api/cms/share-your-recipe", 3600);
}

// Testimonial Data
export async function getTestimonialData() {
  return useServerApi("/api/cms/testimonial", 3600);
}

// Recipe Library
export async function getRecipeLibraryData() {
  return useServerApi("/api/recipe-libraries", 3600);
}

// Recent Blogs
export async function getRecentBLogs() {
  return useServerApi("/api/blogs", 3600);
}

// Trending Recipes (Public)
export async function getTrendingRecipesPublic() {
  return useServerApi("/api/guest/trending-recipes", 3600);
}

// Recipe Library
export async function getRecipeLibrary() {
  return useServerApi("/api/recipe-libraries", 3600);
}

// Recipe Library
export const getRecipeLibraryClient = () => {
  return useClientApi({
    method: "get",
    key: ["recipe-library"],
    endpoint: "/api/recipe-libraries",
  });
};

// All Categories
export const getAllCategories = () => {
  return useClientApi({
    method: "get",
    key: ["categories"],
    endpoint: "/api/categories",
  });
};

// All Library
export const getAllLibrary = () => {
  return useClientApi({
    method: "get",
    key: ["library"],
    endpoint: "/api/recipe-libraries",
  });
};

// Recipe Details
export const getRecipeDetails = (id: any) => {
  return useClientApi({
    method: "get",
    enabled: !!id,
    key: ["recipe-details", id],
    endpoint: `/api/single-recipe/${id}`,
  });
};

// Recipe Review
export const getRecipeReview = (recipe_id: number, page_id: number) => {
  return useClientApi({
    method: "get",
    key: ["recipe-reviews", recipe_id, page_id],
    endpoint: `/api/reviews-by-pagination/${recipe_id}?page=${page_id}`,
    queryOptions: {
      retry: false,
    },
  });
};

// Meal Planner Info
export const getMealPlannerInfo = () => {
  return useClientApi({
    method: "get",
    key: ["meal-planner-info"],
    endpoint: "api/cms/meal-planning-by-age-group",
  });
};

// Meal Planner Card
export const getMealPlannerCard = () => {
  return useClientApi({
    method: "get",
    key: ["meal-planner-card"],
    endpoint: "api/cms/meal-planner-card",
  });
};

// Recent Blogs
export const getBlogDetails = (slug: string) => {
  return useClientApi({
    method: "get",
    enabled: !!slug,
    key: ["blog-details", slug],
    endpoint: `/api/blog/${slug}`,
  });
};

// Site Settings (Client)
export const getSiteSettingsClient = () => {
  return useClientApi({
    method: "get",
    key: ["get-site-settings"],
    endpoint: `/api/site-settings`,
  });
};

// Get Wishlist
export const getWishlist = (page_id?: number, category_id?: number) => {
  return useClientApi({
    method: "get",
    key: ["get-wishlist", page_id, category_id],
    endpoint: "/api/wishlists",
    isPrivate: true,
    params: { page_id, category_id },
    queryOptions: {
      retry: false,
    },
  });
};

// Get My Recipes
export const getMyRecipes = (page_id?: number, category_id?: number) => {
  return useClientApi({
    method: "get",
    key: ["get-wishlist", page_id, category_id],
    endpoint: "/api/my-recipes",
    isPrivate: true,
    params: { page_id, category_id },
    queryOptions: {
      retry: false,
    },
  });
};

// Meal Planner Table
export const getMealPlannerTableData = () => {
  return useClientApi({
    method: "get",
    isPrivate: true,
    key: ["meal-planner-data"],
    endpoint: `/api/get-meal-plans`,
  });
};
