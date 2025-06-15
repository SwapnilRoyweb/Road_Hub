import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Main from './Layout/Main.jsx';
import Home from './Home/Home/Home.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main></Main>,
    children : [
      {
        path: '/',
        element: <Home></Home>
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}>

    </RouterProvider>
  </StrictMode>,
)
