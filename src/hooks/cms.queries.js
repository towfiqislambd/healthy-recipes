import { useQuery } from '@tanstack/react-query';
import { AllCategories, AllRecipes, Blogs, HomepageBanner, MealPlannerCard, MealPlannerTitleAndDesc, OurMealPlanner, RecipeLibrary, ShareYourRecipe, Testimonial, WhyChooseUs } from './cms.api';

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

// Blog Page - All Blogs
export const useBlogs = () => {
 return useQuery({
      queryKey: ['blogs'],
      queryFn: Blogs,
    });
};

//==================== 2nd day =====================

// All Recipe Page - All Categories
export const useAllCategories = () => {
  return useQuery({
       queryKey: ['all-categories'],
       queryFn: AllCategories,
     });
};
export const useAllRecipes = () => {
  return useQuery({
       queryKey: ['all-recipes'],
       queryFn: AllRecipes,
     });
};