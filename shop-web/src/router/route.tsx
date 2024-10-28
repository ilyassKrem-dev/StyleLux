import { createBrowserRouter } from "react-router-dom"
import LayoutHome from "../components/home/layoutHome"
import Home from "../components/home/Home"
import AuthLayout from "../components/auth/authLayout"
import Login from "../components/auth/login/Login"
import SignUp from "../components/auth/signup/signup"
import Layout from "../app/layout"
import Shop from "../components/(others)/shop/shop"
import Restore from "../components/auth/restore/restore"
import ProductPage from "../components/(others)/products/product"
import CartPage from "../components/(others)/cart/Cart"
import CheckOut from "../components/(others)/checkout/checkout"
import ProfileLayout from "../components/(others)/profile/profileLayout"
import ProfileHome from "../components/(others)/profile/home/profileHome"
import ProfileInfo from "../components/(others)/profile/info/profileInfo"
import ProfileOrders from "../components/(others)/profile/orders/profileOrders"
import ProfileFavorites from "../components/(others)/profile/favorites/profileFavorites"



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
                    },{
                        path:"/products/:id",
                        element:<ProductPage />
                        
                    },{
                        path:"/cart",
                        element:<CartPage />
                        
                    },{
                        path:"/cart/checkout",
                        element:<CheckOut />
                    },{
                        path:"/profile",
                        element:<ProfileLayout />,
                        children:[
                            {
                                path:"",
                                element:<ProfileHome />
                            },
                            {
                                path:"info",
                                element:<ProfileInfo />
                            },
                            {
                                path:"orders",
                                element:<ProfileOrders />
                            },
                            {
                                path:"favorites",
                                element:<ProfileFavorites />
                            }
                        ]
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