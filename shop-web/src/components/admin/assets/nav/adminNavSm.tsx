import { useDispatch } from "react-redux";
import DarkMode from "../../../../assets/shared/darkmode/darkMode";
import { navTabs } from "../../shared/navTabs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { removeSession } from "../../../../assets/redux/session/sessionReducer";



export default function AdminNavSm() {
    const dispatch  = useDispatch()
    const router = useNavigate()
    const pathname = useLocation().pathname.split("/")[2] ?? ""
    const handleLogout = () => {
        dispatch(removeSession())
        router("/auth/login")
    }
    return (
        <div className="fixed top-0 left-0 right-0  bg-white dark:bg-dark z-40">
            <div className="bg-white dark:bg-dark border-b border-b-black/40 dark:border-b-white/40 shadow-md">
                <div className="p-4">
                    <div className={`flex items-center gap-2`}>
                        <div  className={` font-volkhov text-4xl font-semibold cursor-pointer dark:text-white `}>Shop</div>
                        <DarkMode />
                    </div>
                </div>
                <div className="mt-2 px-3 flex justify-center items-center">
                    <div className="flex gap-6 overflow-scroll scrollbar-none">
                        {navTabs.map((tab,index) => {
                            const {name,path} =tab
                            const check = pathname == path
                            return (
                                <Link to={`/admin/${path}`} key={index} className="relative group cursor-pointer">
                                    <p className={`p-2 font-semibold ${check ? "text-black dark:text-white":" text-black/50 dark:text-white/50"} group-active:scale-90 cursor-pointer`}>
                                        {name}
                                    </p>
                                    <div className={`h-[3px] w-full rounded-t-md ${check ?"bg-black dark:bg-white":""}`} />
                                    
                                </Link>
                            )
                        })}
                        <div className="relative group hover-opacity cursor-pointer" onClick={handleLogout}>
                            <p className="p-2 text-accent cursor-pointer group-active:scale-90">
                                Logout
                            </p>
                            <div className="h-[3px] w-full bg-accent rounded-t-md hidden group-hover:block transition-all duration-300" />
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}