import { createBrowserRouter } from "react-router-dom"
import Layout from "../app/layout"
import Home from "../components/home/Home"
import AuthLayout from "../components/auth/authLayout"
import Login from "../components/auth/login/Login"
import SignUp from "../components/auth/signup/signup"




const router = createBrowserRouter([
    {
        path:"/",
        element:<Layout />,
        children:[
            {
                path:"",
                element:<Home />
            }
        ]

    },
    {
        path:"/auth",
        element:<AuthLayout />,
        children:[
            {
                path:"login",
                element:<Login />
            },{
                path:"signup",
                element:<SignUp />
            }
        ]
    }
])


export default router