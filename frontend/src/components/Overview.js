import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />
    },
    {
      path: '/questionnaire',
      element: <Questionnaire />
    },
    {
      path: '/guestlist',
      element: <Guestlist />
    },
    {
      path: '/seatingchart',
      element: <Seatingchart />
    },
  ]);