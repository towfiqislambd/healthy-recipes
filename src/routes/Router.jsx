import MainLayout from '@/layouts/MainLayout';
import AllRecipes from '@/pages/all-recipes/AllRecipes';
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
        path: '/all-recipes',
        element: <AllRecipes />,
      },
      {
        path: '/recipe-details/:id',
        element: <RecipeDetails />,
      },
    ],
  },
]);
