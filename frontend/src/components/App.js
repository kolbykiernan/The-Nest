import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

// import components

import HomePage from './HomePage'; 
import Questionnaire from './Questionnaire';
import Guestlist from './guestlist';
import Seatingchart from './seatingchart';


// react routes//

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

])

function App() {
  return (
    <RouterProvider router={router}/>
  ); 
}

export default App;
