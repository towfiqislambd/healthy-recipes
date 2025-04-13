import { axiosPublic } from './useAxiosPublic';
// import { axiosSecure } from './useAxiosSecure';

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
//=================== 2nd day ===================

// All Recipe Page - All Categories
export const AllCategories = async () => {
    const { data } = await axiosPublic('/api/categories');
    return data?.data;
};
export const AllRecipes = async () => {
    const { data } = await axiosPublic('/api/recipes');
    return data?.data;
};
