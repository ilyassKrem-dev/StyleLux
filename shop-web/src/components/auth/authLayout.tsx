import { Outlet, useLocation } from "react-router-dom"
import { useSize } from "../../lib/utils/hooks/hooks"
import AuthOtherWay from "./shared/authOtherWay"




export default function AuthLayout() {
    const {w} = useSize()
    const pathname = useLocation().pathname
    console.log(pathname)
    return (
        <div className="h-screen flex items-center justify-center">
            <div className="flex items-center  gap-3 flex-1 p-6 max-w-[1000px] mx-auto">
                {w>654&&<div className="border rounded-md sm:w-[300px] md:w-[400px]  w-[500px] h-[700px] bg-gray-300">
                    <img src="/images/image1.png" alt="" className=" w-full h-full object-contain" />
                </div>}
                <div className="p-5 flex-1">
                    <h1 className=" font-volkhov text-4xl font-bold max-[654px]:text-center">Shop</h1>
                    <div className="mt-10 flex flex-col gap-10">
                        <AuthOtherWay path={pathname}/>
                        <div className="flex items-center justify-center">
                            <div className="flex gap-3 items-center">
                                <div className="h-[8px] bg-gray-500 w-[50px]"/>
                                <h5 className="font-bold text-xl text-gray-500">OR</h5>
                                <div className="h-[8px] bg-gray-500 w-[50px]"/>
                            </div>
                        </div>
                    </div>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}