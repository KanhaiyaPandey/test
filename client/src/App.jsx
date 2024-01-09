
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import HomeLayout from "./pages/HomeLayout";
import Home from "./pages/Home";
import {  loginAction, profileAction, RegisterAction } from "./utils/actions";
import ErrorPage from "./pages/ErrorPage";
import { AllUsersLoader, dashboardLoader } from "./utils/loaders";
import Allusers from "./pages/Allusers";
import CreateAdmin from "./pages/CreateAdmin";
import UpdateUser from "./pages/UpdateUser";



const router = createBrowserRouter([
      {
        path: "/",
        element:<Register/>,
        errorElement:<ErrorPage/>,
        action: RegisterAction
        
      },
      {
        path: "/login",
        element: <Login/>,
        errorElement:<ErrorPage/>,
        action: loginAction
      },
      {
        path: "/dashboard",
        element:<HomeLayout/>,
        errorElement:<ErrorPage/>,
        children:[
          {
            index: true,
            element: <Home/>,
            loader: dashboardLoader,
          },
          {
            path: "all-users",
            element:<Allusers/>,
            loader: AllUsersLoader
          },
          {
             path: "create-admin",
             element: <CreateAdmin/>,
          },

          {
            path: "update-user/:id",
            element:<UpdateUser/>,
            action: profileAction
          }
       
        ]
      }
])

const App = () => {
  return (
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App
