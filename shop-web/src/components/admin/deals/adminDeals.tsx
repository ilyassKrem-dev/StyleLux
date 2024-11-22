import { useLocation, Outlet } from "react-router-dom"
import AdminDealsTop from "./assets/AdminDealsTop"




export default function AdminDeals() {
    const pathname = useLocation().pathname.includes("edit") || useLocation().pathname.includes("add")
    return (
        <div className="flex flex-col gap-4 flex-1  max-w-[1200px] lg:mx-auto px-2 pt-32 lg:pt-12">
            {!pathname&&<AdminDealsTop />}
            <Outlet />
        </div>
    )
}