import { Link, Outlet, useLocation } from "react-router-dom"
import { useSize } from "../../lib/utils/hooks/hooks"
import AuthOtherWay from "./shared/authOtherWay"
import DarkMode from "../../assets/shared/darkmode/darkMode"
import { GoogleOAuthProvider } from "@react-oauth/google"
import { useSession } from "../../assets/shared/wrappers/SessionWrapper"
import { useDispatch } from "react-redux"
import Cookies from "js-cookie"
import { removeSession } from "../../assets/redux/session/sessionReducer"

export default function AuthLayout() {
    const {w} = useSize()
    const pathname = useLocation().pathname
    const {session} = useSession()
    const dispatch = useDispatch()
    const  handleLogout = () => {
        dispatch(removeSession())
        Cookies.remove("authToken")
    } 
    return (
        <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
            <div className="h-screen flex items-center justify-center font-poppins dark:bg-dark">
                <div className="flex items-center  gap-3 flex-1 p-4 sm:p-6 max-w-[1000px] mx-auto">
                    {w>654&&<div className="border rounded-md sm:w-[300px] md:w-[400px]  w-[500px] h-[700px] bg-gray-300 dark:bg-gray-100">
                        <img src="/images/image1.png" alt="" className=" w-full h-full object-contain" />
                    </div>}
                    <div className="p-2 sm:p-5 flex-1">
                        <div className="flex gap-2 items-center max-[654px]:justify-center">
                            <Link to={"/"}>
                                <h1 className=" font-volkhov text-4xl font-bold max-[654px]:text-center cursor-pointer hover:text-black/70 active:scale-95 transition-all duration-300 dark:text-white dark:hover:text-white/70 ">Shop</h1>
                            </Link>
                            <DarkMode />
                        </div>
                        {!session
                        ?
                        <>
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
                        </>
                        :
                        <div className="font-semib-bold justify-center items-center flex flex-col text-2xl mt-6 gap-6">
                            <h3 className="dark:text-white">Already logged in</h3>
                            <button className="text-base py-2 w-full border-accent text-accent bg-white border rounded-lg active:scale-95 hover:bg-accent/30 hover:text-white dark:bg-dark  dark:hover:bg-accent/40" onClick={handleLogout}>Logout</button>
                        </div>
                        }

                    </div>
                </div>
            </div>
        </GoogleOAuthProvider>

      
    )
}