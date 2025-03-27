import MainLayout from '@/layouts/MainLayout';
import Homepage from '@/pages/homepage/Homepage';
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
    ],
  },
]);
