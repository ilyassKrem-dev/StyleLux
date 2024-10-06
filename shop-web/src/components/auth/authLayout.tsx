import { Link, Outlet, useLocation } from "react-router-dom"
import { useSize } from "../../lib/utils/hooks/hooks"
import AuthOtherWay from "./shared/authOtherWay"
import DarkMode from "../../assets/shared/darkmode/darkMode"




export default function AuthLayout() {
    const {w} = useSize()
    const pathname = useLocation().pathname
    
    return (
        <div className="h-screen flex items-center justify-center font-poppins dark:bg-dark">
            <div className="flex items-center  gap-3 flex-1 p-4 sm:p-6 max-w-[1000px] mx-auto">
                {w>654&&<div className="border rounded-md sm:w-[300px] md:w-[400px]  w-[500px] h-[700px] bg-gray-300 dark:bg-gray-100">
                    <img src="/images/image1.png" alt="" className=" w-full h-full object-contain" />
                </div>}
                <div className="p-2 sm:p-5 flex-1">
                    <div className="flex gap-2 items-center">
                        <Link to={"/"}>
                            <h1 className=" font-volkhov text-4xl font-bold max-[654px]:text-center cursor-pointer hover:text-black/70 active:scale-95 transition-all duration-300 dark:text-white dark:hover:text-white/70">Shop</h1>
                        </Link>
                        <DarkMode />
                    </div>
                    <div className="mt-10 flex flex-col gap-10">
                        <AuthOtherWay path={pathname}/>
                        <div className="flex items-center justify-center">
                            <div className="flex gap-3 items-center">
                                <div className="h-[6px] bg-gray-500 w-[50px] dark:bg-gray-100"/>
                                <h5 className="font-bold text-xl text-gray-500 dark:text-gray-100">OR</h5>
                                <div className="h-[6px] bg-gray-500 w-[50px] dark:bg-gray-100"/>
                            </div>
                        </div>
                    </div>
                    <Outlet />
                </div>
            </div>
        </div>

      
    )
}