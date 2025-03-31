import AuthLayout from '@/layouts/AuthLayout';
import MainLayout from '@/layouts/MainLayout';
import AllRecipes from '@/pages/all-recipes/AllRecipes';
import Login from '@/pages/auth/login/Login';
import Register from '@/pages/auth/register/Register';
import VerifyEmail from '@/pages/auth/verify-email/VerifyEmail';
import VerifyOtp from '@/pages/auth/verify-otp/VerifyOtp';
import BlogDetails from '@/pages/blog-details/BlogDetails';
import Blog from '@/pages/blog/Blog';
import ErrorPage from '@/pages/error/ErrorPage';
import Homepage from '@/pages/homepage/Homepage';
import RecipeDetails from '@/pages/recipe-details/RecipeDetails';
import RecipeLibrary from '@/pages/recipe-library/RecipeLibrary';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
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
        path: '/blog',
        element: <Blog />,
      },
      {
        path: '/blog/:id',
        element: <BlogDetails />,
      },
    ],
  },
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
    ],
  },
]);
