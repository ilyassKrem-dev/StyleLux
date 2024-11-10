import {useLocation, useNavigate } from "react-router-dom";



export default function NotFoundItem() {
    const pathname = useLocation().pathname
    const router = useNavigate()
    const handleBack = () => {
        if(pathname.startsWith("/products")) {
            return router("/products")
        }
    }
    return (
        <div className="h-screen flex justify-center items-center">
            <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-2 items-center dark:text-white">
                    <h3 className=" font-bold text-4xl">404</h3>
                    <h1 className=" font-bold text-4xl">Not found</h1>
                </div>
                <div onClick={handleBack}>
                    <button className=" dark:bg-white w-full rounded-md py-2 bg-black text-white dark:text-black font-semibold dark:hover:bg-white/70 transition-all duration-300 hover:bg-black/70 active:scale-95">Back</button>
                </div>
                
            </div>
        </div>
    )
}