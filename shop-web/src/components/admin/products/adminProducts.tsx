import { Outlet, useLocation } from "react-router-dom";
import AdminProductsTop from "./assets/adminProductsTop";




export default function AdminProducts() {
    const pathname = useLocation().pathname.includes("edit") || useLocation().pathname.includes("add")
    return (
        <div className="flex flex-col gap-4 flex-1  max-w-[1200px] lg:mx-auto px-2 pt-32 lg:pt-12">
            {!pathname&&<AdminProductsTop />}
            <Outlet />
        </div>
    )
}