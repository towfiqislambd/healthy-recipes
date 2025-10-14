import toast from "react-hot-toast";
import useClientApi from "@/Hooks/useClientApi";
import { useServerApi } from "@/Hooks/useServerApi";
import { useQueryClient } from "@tanstack/react-query";

// ================================================
//  ISR (Incremental Static Regeneration)
// ================================================

// Site Settings
export async function getSiteSettings() {
  return useServerApi({
    mode: "ISR",
    revalidate: 86400,
    endpoint: "/api/site-settings",
  });
}

// Social Links
export async function getSocialLinks() {
  return useServerApi({
    mode: "ISR",
    revalidate: 86400,
    endpoint: "/api/social-links",
  });
}

// ================================================
//  SSR (Server Side Rendering)
// ================================================

// Trending Recipes (Public)
export async function getTrendingRecipesPublic() {
  return useServerApi({
    mode: "SSR",
    endpoint: "/api/guest/trending-recipes",
  });
}

// ================================================
//  SSG (Static Site Generation)
// ================================================

// Hero Data
export async function getHeroData() {
  return useServerApi({
    mode: "SSG",
    endpoint: "/api/cms/home-banner",
  });
}

// Why Choose Data
export async function getWhyChooseData() {
  return useServerApi({
    mode: "SSG",
    endpoint: "/api/cms/why-choose-us",
  });
}

// Recipe Library
export async function getRecipeLibraryData() {
  return useServerApi({
    mode: "SSG",
    endpoint: "/api/recipe-libraries",
  });
}

// Recipe Categories
export async function getRecipeCategories() {
  return useServerApi({
    mode: "SSG",
    endpoint: "/api/categories",
  });
}

// Meal Planner Data
export async function getMealPlannerData() {
  return useServerApi({
    mode: "SSG",
    endpoint: "/api/cms/meal-planner",
  });
}

// Share Recipes Data
export async function getShareRecipesData() {
  return useServerApi({
    mode: "SSG",
    endpoint: "/api/cms/share-your-recipe",
  });
}

// Testimonial Data
export async function getTestimonialData() {
  return useServerApi({
    mode: "SSG",
    endpoint: "/api/cms/testimonial",
  });
}

// Recent Blogs
export async function getRecentBLogs() {
  return useServerApi({
    mode: "SSG",
    endpoint: "/api/blogs",
  });
}

// Recent Details
export async function getBlogDetails(slug: string) {
  return useServerApi({
    mode: "SSG",
    endpoint: `/api/blog/${slug}`,
  });
}

// Meal Planner Info
export async function getMealPlannerInfo() {
  return useServerApi({
    mode: "SSG",
    endpoint: "/api/cms/meal-planning-by-age-group",
  });
}

// Meal Planner Card
export async function getMealPlannerCard() {
  return useServerApi({
    mode: "SSG",
    endpoint: "/api/cms/meal-planner-card",
  });
}

// =======================================================
//  CSR (Client Side Rendering)
// =======================================================

// Get All Recipes Public
export const getAllRecipesPublic = ({
  category_id,
  recipe_library_id,
  age_group,
  tag_id,
  search,
}: {
  category_id?: number;
  recipe_library_id?: number;
  age_group?: string;
  tag_id?: number;
  search?: string;
}) => {
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
      "all-recipes-private",
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
      if (data?.success) {
        if (data?.data?.length === 0) {
          toast.success("Removed from favorites");
        } else {
          toast.success("Added to favorites");
        }
        queryClient.invalidateQueries("get-wishlists" as any);
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
      if (data?.success) {
        queryClient.invalidateQueries("all-recipe-reviews" as any);
        toast.success(data?.message);
      }
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message);
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

// Add Meal Planner
export const useAddMealPlanner = (recipe_id: number | null) => {
  const queryClient = useQueryClient();
  return useClientApi({
    method: "post",
    key: ["add-meal-planner", recipe_id],
    isPrivate: true,
    endpoint: `api/meal-plans/${recipe_id}`,
    onSuccess: (data: any) => {
      if (data?.success) {
        toast.success(data?.message);
        queryClient.invalidateQueries("meal-planner-data" as any);
      }
    },
  });
};

// Delete Meal Planner
export const useDeleteMealPlanner = () => {
  const queryClient = useQueryClient();
  return useClientApi({
    method: "delete",
    key: ["delete-meal-planner"],
    isPrivate: true,
    onSuccess: (data: any) => {
      if (data?.success) {
        toast.success(data?.message);
        queryClient.invalidateQueries("meal-planner-data" as any);
      }
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
      if (data?.success) {
        queryClient.invalidateQueries("meal-planner-data" as any);
      }
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
      if (data?.success) {
        toast.success(data?.message);
      }
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message);
    },
  });
};

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

// Share Recipe
export const getShareRecipe = () => {
  return useClientApi({
    method: "get",
    key: ["share-recipe"],
    endpoint: "/api/cms/share-your-recipe",
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
    key: ["all-recipe-reviews", recipe_id, page_id],
    endpoint: `/api/reviews-by-pagination/${recipe_id}?page=${page_id}`,
    queryOptions: {
      retry: false,
    },
  });
};

// Get Wishlist
export const getWishlist = (
  page_id?: number,
  category_id?: number | string
) => {
  return useClientApi({
    method: "get",
    key: ["get-wishlists", page_id, category_id],
    endpoint: "/api/wishlists",
    isPrivate: true,
    params: { page_id, category_id },
    queryOptions: {
      retry: false,
    },
  });
};

// Get My Recipes
export const getMyRecipes = (
  page_id?: number,
  category_id?: number | string
) => {
  return useClientApi({
    method: "get",
    key: ["get-my-recipe", page_id, category_id],
    endpoint: "/api/my-recipes",
    isPrivate: true,
    params: { page_id, category_id },
    queryOptions: {
      retry: false,
    },
  });
};
