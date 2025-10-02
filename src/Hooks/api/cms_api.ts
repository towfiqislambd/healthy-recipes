import { useServerApi } from "@/Hooks/useServerApi";

// =======================================================
//  CSR (Client Side Rendering)
// =======================================================

// All CSR here.....

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
