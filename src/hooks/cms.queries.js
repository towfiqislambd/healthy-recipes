import { useQuery } from '@tanstack/react-query';
import { AllCategories, AllRecipes, AllRecipesPrivate, BlogDetails, Blogs, FooterInfo, GetWishlist, HomepageBanner, MealPlannerCard, MealPlannerTableData, MealPlannerTitleAndDesc, MyRecipeDetails, MyRecipes, OurMealPlanner, RecipeDetails, RecipeLibrary, RecipeReviews, ShareYourRecipe, SocialInfo, Testimonial, TrendingRecipes, TrendingRecipesPrivate, WhyChooseUs } from './cms.api';
import useAuth from './useAuth';

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

// Home Page - Trending Recipes (Public)
export const useTrendingRecipes = () => {
  return useQuery({
       queryKey: ['trending-recipes'],
       queryFn: TrendingRecipes,
     });
};

// Home Page - Trending Recipes (Private)
export const useTrendingRecipePrivate = () => {
  const {user} = useAuth();
  return useQuery({
       queryKey: ['trending-recipes-private'],
       queryFn: TrendingRecipesPrivate,
       enabled: !!user
     });
};

// All Recipes (Public)
export const useAllRecipes = (category_id, recipe_library_id, age_group, tag_id) => {
  return useQuery({
    queryKey: ['all-recipes', category_id, recipe_library_id, age_group, tag_id],
    queryFn: () => AllRecipes(category_id, recipe_library_id, age_group, tag_id),
  });
};

// All Recipes (Private)
export const useAllRecipesPrivate = (category_id, recipe_library_id, age_group, tag_id) => {
  const {user} = useAuth();
  return useQuery({
    queryKey: ['all-recipes-private', category_id, recipe_library_id, age_group, tag_id],
    queryFn: () => AllRecipesPrivate(category_id, recipe_library_id, age_group, tag_id),
    enabled: !!user
  });
};

// All Recipe Library
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

// Footer Info:
export const useFooterInfo = () => {
  return useQuery({
    queryKey: ['footer-info'],
    queryFn: FooterInfo,
  });
};

// Social Info:
export const useSocialInfo = () => {
  return useQuery({
    queryKey: ['social-links'],
    queryFn: SocialInfo,
  });
};

// Recipe reviews
export const useRecipeReviews = (recipe_id, page_id) => {
  return useQuery({
    queryKey: ['recipe-reviews', recipe_id, page_id],
    queryFn: () => RecipeReviews(recipe_id, page_id),
  });
};

// Get Wishlist
export const useGetWishlist = (page_id, category_id) => {
  return useQuery({
    queryKey: ['get-wishlists', page_id, category_id],
    queryFn:() =>  GetWishlist(page_id, category_id),
  });
};

// My Recipes
export const useMyRecipes = (page_id, category_id, search) => {
  return useQuery({
    queryKey: ['my-recipes', page_id, category_id, search],
    queryFn:() =>  MyRecipes(page_id, category_id, search),
  });
};

// My Recipe Details
export const useMyRecipeDetails = (id) => {
  return useQuery({
       queryKey: ['my-recipe-details', id],
       queryFn: () => MyRecipeDetails(id),
       enabled: !!id,
     });
};

// Meal Planner Table
export const useMealPlannerTable = (category_id) => {
  return useQuery({
       queryKey: ['meal-planner-table',category_id],
       queryFn: () => MealPlannerTableData(category_id),
     });
};