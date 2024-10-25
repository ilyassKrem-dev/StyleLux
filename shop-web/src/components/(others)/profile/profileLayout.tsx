import {  Outlet } from "react-router-dom"
import ProfileNav from "./nav/profileNav"

export default function ProfileLayout() {
    
    
    return (
        
        <div className="sm:py-8  lg:flex flex-1">
            <ProfileNav />
            <Outlet />
        </div>

    )
}