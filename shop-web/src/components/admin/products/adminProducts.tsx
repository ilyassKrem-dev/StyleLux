import { Outlet } from "react-router-dom";
import AdminProductsTop from "./assets/adminProductsTop";




export default function AdminProducts() {

    return (
        <div className="flex flex-col gap-4 flex-1  max-w-[1200px] lg:mx-auto px-2 pt-32 lg:pt-12">
            <AdminProductsTop />
            <Outlet />
        </div>
    )
}