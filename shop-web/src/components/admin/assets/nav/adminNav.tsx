import { Link, useLocation, useNavigate } from "react-router-dom";
import DarkMode from "../../../../assets/shared/darkmode/darkMode";
import { CiLogout } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { removeSession } from "../../../../assets/redux/session/sessionReducer";
import { navTabs } from "../../shared/navTabs";


export default function AdminNav() {
    const pathname = useLocation().pathname.split("/")[2] ?? ""
    const router = useNavigate()
    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(removeSession())
        router("/auth/login")
    }       
    return (
        <div className="fixed w-[280px] top-0 bottom-0 left-0 border-r border-black/5 dark:border-white/5 bg-white dark:bg-dark">
            <div className="p-8">
                <div className={`flex items-center gap-2`}>
                    <Link to={"/"} className={` font-volkhov text-4xl font-semibold cursor-pointer dark:text-white `}>Shop</Link>
                    <DarkMode />
                </div>
            </div>

            <div className=" mt-1 overflow-y-auto custom-scrollbar p-6">
                <div className="flex flex-col gap-3">
                    {navTabs.map((tab,index) => {
                        const {icon,name,path} = tab
                        const checkPath = path === pathname
                        return (
                        <Link key={index} to={`/admin/${path}`} className={`flex items-center gap-2 px-5 rounded-md   py-3 active:scale-95 ${checkPath ? "bg-black text-white dark:bg-white dark:text-black":" dark:text-white hover:bg-black/80 hover:text-white dark:hover:bg-white/80 dark:hover:text-black transition-all duration-300"}`}>
                            <div className="text-xl">
                                {icon}
                            </div>
                            <p className=" font-medium cursor-pointer">{name}</p>
                        </Link>

                        )
                    })}
                    <div className={`flex items-center gap-2 px-5 rounded-md   py-3 active:scale-95   transition-all duration-300 text-accent`} onClick={handleLogout}>
                        <div className="text-xl">
                            <CiLogout />
                        </div>
                        <p className=" font-medium cursor-pointer">Logout</p>
                    </div>

                </div>
            </div>
        </div>
    )
}