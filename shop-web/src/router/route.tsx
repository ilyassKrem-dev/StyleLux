import { createBrowserRouter } from "react-router-dom"
import LayoutHome from "../components/home/layoutHome"
import Home from "../components/home/Home"
import AuthLayout from "../components/auth/authLayout"
import Login from "../components/auth/login/Login"
import SignUp from "../components/auth/signup/signup"
import Layout from "../app/layout"
import Shop from "../components/(others)/shop/shop"
import Restore from "../components/auth/restore/restore"



const router = createBrowserRouter([
    {
        path:"/",
        element:<Layout />,
        children:[
            {
                path:"",
                element:<LayoutHome />,
                children:[
                    {
                        path:"",
                        element:<Home />,
                    },{
                        path:"/deals",
                        element:(<div>Deals</div>)
                    },{
                        path:"/shop",
                        element:<Shop />
                    }
                ]
            }
            ,
            {
                path:"auth",
                element:<AuthLayout />,
                children:[
                    {
                        path:"login",
                        element:<Login />
                    },{
                        path:"signup",
                        element:<SignUp />
                    },{
                        path:"restore",
                        element:<Restore />
                    }
                ]
            }
        ]

    },
    
])


export default router