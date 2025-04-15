import { useQuery } from '@tanstack/react-query';
import { AllCategories, AllRecipes, BlogDetails, Blogs, HomepageBanner, MealPlannerCard, MealPlannerTitleAndDesc, OurMealPlanner, RecipeDetails, RecipeLibrary, ShareYourRecipe, Testimonial, TrendingRecipes, WhyChooseUs } from './cms.api';

// Homepage - Banner
export const useHomepageBanner = () => {
 return useQuery({
      queryKey: ['banner'],
      queryFn: HomepageBanner,
    });
};

// Homepage - Why Choose Us
export const useWhyChooseUs = () => {
 return useQuery({
      queryKey: ['why-choose-us'],
      queryFn: WhyChooseUs,
    });
};

// Homepage - Our Meal Planner
export const useOurMealPlanner = () => {
 return useQuery({
      queryKey: ['our-meal-planner'],
      queryFn: OurMealPlanner,
    });
};

// Homepage - Share Your Recipe
export const useShareYourRecipe = () => {
 return useQuery({
      queryKey: ['share-your-recipe'],
      queryFn: ShareYourRecipe,
    });
};

// Homepage - Testimonial
export const useTestimonial = () => {
 return useQuery({
      queryKey: ['testimonial'],
      queryFn: Testimonial,
    });
};

// Home Page - Trending Recipes
export const useTrendingRecipes = () => {
  return useQuery({
       queryKey: ['trending-recipes'],
       queryFn: TrendingRecipes,
     });
};

// All Recipes
export const useAllRecipes = (category_id, recipe_library_id, age_group, tag_id) => {
  return useQuery({
    queryKey: ['all-recipes', category_id, recipe_library_id, age_group, tag_id],
    queryFn: () => AllRecipes(category_id, recipe_library_id, age_group, tag_id),
  });
};

// Recipe Library Page - Recipe Library
export const useRecipeLibrary = () => {
 return useQuery({
      queryKey: ['recipe-library'],
      queryFn: RecipeLibrary,
    });
};

// Meal Planner Page - Title And Desc
export const useMealPlannerTitleAndDesc = () => {
 return useQuery({
      queryKey: ['meal-planner-titleAndDesc'],
      queryFn: MealPlannerTitleAndDesc,
    });
};

// Meal Planner Page - Meal Planner Card
export const useMealPlannerCard = () => {
 return useQuery({
      queryKey: ['meal-planner-card'],
      queryFn: MealPlannerCard,
    });
};

// Meal Planner Page - Recipe Details
export const useRecipeDetails = (id) => {
  return useQuery({
       queryKey: ['recipe-details', id],
       queryFn: () => RecipeDetails(id),
       enabled: !!id,
     });
};

// Meal Planner Page - All Categories
export const useAllCategories = () => {
  return useQuery({
       queryKey: ['all-categories'],
       queryFn: AllCategories,
     });
};

// Blog Page - All Blogs
export const useBlogs = () => {
 return useQuery({
      queryKey: ['blogs'],
      queryFn: Blogs,
    });
};

// Blog Details Page - Blog Details
export const useBlogDetails = (slug) => {
  return useQuery({
    queryKey: ['blog-details', slug], 
    queryFn: () => BlogDetails(slug),
    enabled: !!slug,
     });
};

//==================== 2nd day =====================