import {  Outlet } from "react-router-dom"
import ProfileNav from "./nav/profileNav"

export default function ProfileLayout() {
    
    
    return (
        
        <div className="md:py-8  lg:flex">
            <ProfileNav />
            <Outlet />
        </div>

    )
}