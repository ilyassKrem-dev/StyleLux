import { Outlet } from "react-router-dom";




export default function ProfileInfoLayout() {

    return (
        <div className="max-w-[900px] mx-auto pt-8 flex-1">
            <Outlet />
        </div> 
    )
}