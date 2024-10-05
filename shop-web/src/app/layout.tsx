import { Outlet } from "react-router-dom";
import Nav from "../assets/shared/Nav";







export default function Layout() {

    return (
        <div className="h-screen bg-white flex flex-col font-roboto p-4">
            <div className="h-[40px]">
                <Nav />
            </div>
            <Outlet />
        </div>
    )
}