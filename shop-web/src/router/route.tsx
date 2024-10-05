import { createBrowserRouter } from "react-router-dom"
import Layout from "../app/layout"
import Home from "../components/home/Home"
import AuthLayout from "../components/auth/authLayout"




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
                element:""
            },{
                path:"signup",
                element:""
            }
        ]
    }
])


export default router