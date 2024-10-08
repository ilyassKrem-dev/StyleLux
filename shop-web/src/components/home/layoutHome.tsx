import { Outlet } from "react-router-dom";
import Nav from "../../assets/nav/Nav";








export default function LayoutHome() {
    
    return (
        <div className="min-h-screen bg-white flex flex-col font-roboto p-4 dark:bg-dark">
            <div className="h-[40px]">
                <Nav />
            </div>
           
            <Outlet />
    
        </div>
    )
}