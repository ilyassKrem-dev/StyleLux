import { AiFillProduct } from "react-icons/ai";
import { MdDashboard, MdAddShoppingCart, MdDiscount } from "react-icons/md";



export const navTabs = [
    {
        name:"Dashboard",
        icon:<MdDashboard />,
        path:"" 
    },{
        name:"Orders",
        icon:<MdAddShoppingCart />,
        path:"orders"
    },{
        name:"Products",
        icon:<AiFillProduct />,
        path:"products"
    },{
        name:"Deals",
        icon:<MdDiscount />,
        path:"deals"
    }
]