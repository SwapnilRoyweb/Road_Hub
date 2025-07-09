import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Main from './Layout/Main.jsx';
import Home from './Home/Home/Home.jsx';
import Login from './SignIn_Up/SignIn/Login.jsx';
import Signup from './SignIn_Up/SignUp/Signup.jsx';
import Authprovider from './Providers/Authprovider.jsx';
import Privateroute from './Routes/Privateroute.jsx';
import AdminHome from './Home/AdminHome/AdminHome.jsx';
import EditRunningTask from './Components/EditTask/EditRunningTask.jsx';
import EditCompletedtask from './Components/EditTask/EditCompletedTask.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Privateroute><Home></Home></Privateroute>
      },
      {
        path: 'login',
        element: <Login></Login>
      },
      {
        path: 'signUp',
        element: <Signup></Signup>
      },
      {
        path: 'adminHome',
        element: <Privateroute><AdminHome></AdminHome></Privateroute>
      },
      {
        path: 'runningUpdateComment/:id',
        element: <Privateroute><EditRunningTask></EditRunningTask></Privateroute>,
        loader: ({params}) => fetch(`http://localhost:3000/items/${params.id}`)
      },
      {
        path: 'completedUpdateComment/:id',
        element: <Privateroute><EditCompletedtask></EditCompletedtask></Privateroute>,
        loader: ({params}) => fetch(`http://localhost:3000/items/${params.id}`)
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Authprovider>
      <RouterProvider router={router}>
      </RouterProvider>
    </Authprovider>
  </StrictMode>,
)
