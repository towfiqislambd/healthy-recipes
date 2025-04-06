import AuthLayout from '@/layouts/AuthLayout';
import DashboardLayout from '@/layouts/DashboardLayout';
import MainLayout from '@/layouts/MainLayout';
import AllRecipes from '@/pages/all-recipes/AllRecipes';
import Login from '@/pages/auth/login/Login';
import Register from '@/pages/auth/register/Register';
import ResetPassword from '@/pages/auth/reset-password/ResetPassword';
import VerifyEmail from '@/pages/auth/verify-email/VerifyEmail';
import VerifyOtp from '@/pages/auth/verify-otp/VerifyOtp';
import BlogDetails from '@/pages/blog-details/BlogDetails';
import Blog from '@/pages/blog/Blog';
import DashboardMealPlanner from '@/pages/dashboard/DashboardMealPlanner';
import DashboardMyRecipes from '@/pages/dashboard/DashboardMyRecipes';
import DashboardOverview from '@/pages/dashboard/DashboardOverview';
import DashboardSavedRecipes from '@/pages/dashboard/DashboardSavedRecipes';
import DashboardShareRecipe from '@/pages/dashboard/DashboardShareRecipe';
import ErrorPage from '@/pages/error/ErrorPage';
import Homepage from '@/pages/homepage/Homepage';
import MealPlanner from '@/pages/meal-planner/MealPlanner';
import RecipeDetails from '@/pages/recipe-details/RecipeDetails';
import RecipeLibrary from '@/pages/recipe-library/RecipeLibrary';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  // Main Layout
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Homepage />,
      },
      {
        path: '/recipe-library',
        element: <RecipeLibrary />,
      },
      {
        path: '/recipe-library/:slug',
        element: <AllRecipes />,
      },
      {
        path: '/recipe-details/:id',
        element: <RecipeDetails />,
      },
      {
        path: '/meal-planner',
        element: <MealPlanner />,
      },
      {
        path: '/blog',
        element: <Blog />,
      },
      {
        path: '/blog/:id',
        element: <BlogDetails />,
      },
    ],
  },
  // Auth Layout
  {
    path: '/auth',
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'verify-email',
        element: <VerifyEmail />,
      },
      {
        path: 'verify-otp',
        element: <VerifyOtp />,
      },
      {
        path: 'reset-password',
        element: <ResetPassword />,
      },
    ],
  },
  // Dashboard Layout
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "overview",
        element: <DashboardOverview />,
      },
      {
        path: 'dashboard-meal-planner',
        element: <DashboardMealPlanner />,
      },
      {
        path: 'dashboard-share-recipes',
        element: <DashboardShareRecipe />,
      },
      {
        path: 'dashboard-my-recipes',
        element: <DashboardMyRecipes />,
      },
      {
        path: 'dashboard-saved-recipes',
        element: <DashboardSavedRecipes />,
      },
    ]
  }
]);
