


import { Link } from "react-router-dom";
import { useDetectScrolling } from "../../lib/utils/hooks/hooks";
import { useSession } from "../shared/wrappers/SessionWrapper";
import NoAuthNav from "./assets/noAuthNav";
import AuthNav from "./assets/auth/authNav";
import UserNav from "./assets/auth/userNav";
import DarkMode from "../shared/darkmode/darkMode";
export default function Nav() {
    const {session} = useSession()
    const scrollDetect = useDetectScrolling()

    return (
        <div className={`fixed top-0 left-0 right-0 p-2 sm:p-8 ${scrollDetect ?"bg-white dark:bg-dark" :""} z-50`}>
            <div className="flex items-center justify-between gap-3 ">
                <div className={`flex items-center gap-2 ${session ?"flex-1" :""}`}>
                    <Link to={"/"}  className={` font-volkhov text-4xl font-semibold cursor-pointer dark:text-white `}>Shop</Link>
                    <DarkMode />
                </div>
                {!session&&<div className="flex items-center gap-8 sm:gap-12  font-poppins">
                    <NoAuthNav />
                </div>}
                {session&&<AuthNav />}
                {session&&<UserNav />}
            </div>
        </div>
    )
}