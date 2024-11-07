import { useEffect, useState } from "react"
import LoadingAnimation from "../../assets/shared/loadingAnmation"
import NotFound from "../../assets/shared/errors/404"
import { useSession } from "../../assets/shared/wrappers/SessionWrapper"
import Admin from "../../lib/api/admin/Admin"
import { useSize } from "../../lib/utils/hooks/hooks"
import AdminNav from "./assets/nav/adminNav"
import { Outlet } from "react-router-dom"



export default function AdminPage() {
    const [isAdmin,setIsAdmin] = useState<boolean|null>(null)
    const {session} = useSession()
    const {w} = useSize()

    useEffect(() => {
        const check = async() => {
            const res = await new Admin(session.uid).isAdmin()
            if(res?.success) {
                setIsAdmin(true)
            } else {
                setIsAdmin(false)
            }
        }
        check()
    },[session])
    if(isAdmin == null) {
        return (
            <div className="h-screen flex justify-center items-center dark:bg-dark">
                <div className="flex flex-col">
                    <LoadingAnimation />
                </div>
            </div>
        )
    }
    if(isAdmin == false) {
        return (
        <NotFound />
        )
    }
    return (
        <div className="min-h-screen dark:bg-darker bg-lighter">
            <div className="flex gap-3">
                {w>670&&
                <div className="w-[280px]">
                    <AdminNav />
                </div>}
                <Outlet />
            </div>
        </div>
    )
}