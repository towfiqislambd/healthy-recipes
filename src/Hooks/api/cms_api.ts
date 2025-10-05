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

// All Categories
export const getAllCategories = () => {
  return useClientApi({
    method: "get",
    key: ["categories"],
    endpoint: "/api/categories",
  });
};
