import MainLayout from '@/layouts/MainLayout';
import AllRecipes from '@/pages/all-recipes/AllRecipes';
import Homepage from '@/pages/homepage/Homepage';
import RecipeLibrary from '@/pages/recipe-library/RecipeLibrary';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
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
    ],
  },
]);
