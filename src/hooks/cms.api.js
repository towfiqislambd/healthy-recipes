import { axiosPublic } from './useAxiosPublic';
import { axiosSecure } from './useAxiosSecure';

// Homepage - Banner
export const HomepageBanner = async () => {
    const { data } = await axiosPublic('/api/cms/home-banner');
    return data?.data;
};

// Homepage - Why Choose Us
export const WhyChooseUs = async () => {
    const { data } = await axiosPublic('/api/cms/why-choose-us');
    return data?.data;
};

// Homepage - Our Meal Planner
export const OurMealPlanner = async () => {
    const { data } = await axiosPublic('/api/cms/meal-planner');
    return data?.data;
};

// Homepage - Share Your Recipe
export const ShareYourRecipe = async () => {
    const { data } = await axiosPublic('/api/cms/share-your-recipe');
    return data?.data;
};

// Homepage - Testimonial
export const Testimonial = async () => {
    const { data } = await axiosPublic('/api/cms/testimonial');
    return data?.data;
};

// Home Page - Trending Recipes
export const TrendingRecipes = async () => {
    const { data } = await axiosPublic('/api/guest/trending-recipes');
    return data?.data;
};

// All Recipes
export const AllRecipes = async (category_id, recipe_library_id, age_group, tag_id) => {
    let url = '/api/recipes?';
    
    if (category_id) url += `category_id=${category_id}&`;
    if (recipe_library_id) url += `recipe_library_id=${recipe_library_id}&`;
    if (age_group) url += `age_group=${age_group}&`;
    if (tag_id) url += `tag_id=${tag_id}&`;
    
    // Remove the last '&' if we added any parameters
    url = url.endsWith('&') ? url.slice(0, -1) : url;
    // If no parameters were added, remove the '?'
    url = url.endsWith('?') ? url.slice(0, -1) : url;
    
    const { data } = await axiosPublic(url);
    return data?.data;
};

// Recipe Library Page - Recipe Library
export const RecipeLibrary = async () => {
    const { data } = await axiosPublic('/api/recipe-libraries');
    return data?.data;
};

// Meal Planner Page - Title And Desc
export const MealPlannerTitleAndDesc = async () => {
    const { data } = await axiosPublic('/api/cms/meal-planning-by-age-group');
    return data?.data;
};

// Meal Planner Page - Meal Planner Card
export const MealPlannerCard = async () => {
    const { data } = await axiosPublic('/api/cms/meal-planner-card');
    return data?.data;
};

// Meal Planner Page - Recipe Details
export const RecipeDetails = async (id) => {
    const { data } = await axiosPublic.get(`/api/single-recipe/${id}`);
    return data?.data;
};

// Meal Planner Page - All Categories
export const AllCategories = async () => {
    const { data } = await axiosPublic('/api/categories');
    return data?.data;
};

// Blog Page - All Blogs
export const Blogs = async () => {
  const { data } = await axiosPublic('/api/blogs');
  return data?.data;
};

// Blog Details Page - Blog Detail
export const BlogDetails = async (slug) => {
    const { data } = await axiosPublic(`/api/blog/${slug}`);
    return data?.data;
};

// Footer Info:
export const FooterInfo = async () => {
    const { data } = await axiosPublic('/api/site-settings');
    return data?.data;
};

// Social Info:
export const SocialInfo = async () => {
    const { data } = await axiosPublic('/api/social-links');
    return data?.data;
};

//=================== 2nd day ===================

// Recipe reviews
export const RecipeReviews = async (recipe_id, page_id) => {
    const { data } = await axiosPublic(`/api/reviews-with-pagination/${recipe_id}?page=${page_id}`);
    return data?.data;
};

// Add reviews
export const AddReview = async (id, payload) => {
    const { data } = await axiosSecure.post(`/api/review/${id}`, payload);
    return data?.data;
};

// Add/Remove Wishlist
export const AddWishlist = async (id) => {
    const { data } = await axiosSecure.post(`/api/wishlist/${id}`);
    return data?.data;
};

// Get Wishlist
export const GetWishlist = async (page_id, category_id) => {
    let url = '/api/wishlists?';

    if (page_id) url += `page=${page_id}&`;
    if (category_id) url += `category_id=${category_id}&`;

     // Remove the last '&' if we added any parameters
     url = url.endsWith('&') ? url.slice(0, -1) : url;
     // If no parameters were added, remove the '?'
     url = url.endsWith('?') ? url.slice(0, -1) : url;

    const { data } = await axiosSecure(url);
    return data?.data;
};