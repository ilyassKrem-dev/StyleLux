import { Link, useLocation } from "react-router-dom"
import { useSize } from "../../../../lib/utils/hooks/hooks"
import { PiUserCircleFill,PiAddressBook,PiStarThin   } from "react-icons/pi";
import { TbTruckDelivery } from "react-icons/tb";
import { CiLogout } from "react-icons/ci";
import { useSession } from "../../../../assets/shared/wrappers/SessionWrapper";

const paths = [
    {
        path:"Home",
        link:"/profile",
        icon:<PiUserCircleFill />
    },{
        path:"Personal info",
        link:"/profile/info",
        icon:<PiAddressBook />
    },{
        path:"Orders",
        link:"/profile/orders",
        icon:<TbTruckDelivery />
    },{
        path:"Favorites",
        link:"/profile/favorites",
        icon:<PiStarThin />
    }
]


export default function profileNav() {
    const pathname = useLocation().pathname
    const {w} = useSize()
    const actualPath = pathname.split("/").splice(0,3).join("/")
    const {signOut} = useSession()
    return (
        <>
            {w<=1024&&<div className="flex gap-10 items-center justify-center  h-[41px]">
                <div className="fixed  left-0 right-0 flex justify-center items-center border-b bg-white dark:bg-dark z-40">
                    <div className="flex gap-10 items-center overflow-x-scroll scrollbar-none max-[450px]:pl-1 ">
                        {paths.map((path,index) => {
                            const isPath = actualPath === path.link
                            return (
                                <Link to={path.link} key={index} className="p-2  relative cursor-pointer group ">
                                    <p className={`font-semibold    cursor-pointer group-hover:text-black dark:group-hover:text-white transition-all duration-300 ${isPath ? "dark:text-white":"text-black/50 dark:text-white/50"} w-fit text-nowrap `}>{path.path}</p>
                                    {isPath &&<div className="absolute bottom-0 right-0 left-0 bg-black h-[5px] rounded-t dark:bg-white " />}
                                    
                                </Link>
                            )
                        })}
                        <div className="p-2  relative cursor-pointer group " onClick={signOut}>        
                            <div className={`font-semibold    cursor-pointer group-hover:text-black dark:group-hover:text-white transition-all duration-300 text-black/50 dark:text-white/50 w-fit text-nowrap `}>
                                Logout
                            </div>
                           
                        </div>    
                    </div>
                </div>
            </div>}

            {w>1024&&
            <div className="w-[300px]">
                <div className="flex flex-col pt-8 fixed top-20 left-0 w-[300px]">
                    {paths.map((path,index) => {
                        const isPath = actualPath == path.link
                        return (
                            <Link to={path.link} key={index} className={`flex gap-2 rounded-r-full p-[0.6rem] items-center font-semibold px-6 ${isPath ?"bg-dark text-white dark:bg-white dark:text-black" :" dark:text-white"} cursor-pointer`}>
                                
                                <div className="text-3xl">
                                    {path.icon}
                                </div>
                                <p className=" cursor-pointer">{path.path}</p>
                            </Link>
                        )
                    })}
                    <div className={`flex gap-2 rounded-r-full p-[0.6rem] items-center font-semibold px-6  cursor-pointer`} onClick={signOut}>        
                        <div className="text-3xl">
                            <CiLogout />
                        </div>
                        <p className=" cursor-pointer">Logout</p>
                    </div>
                    
                </div>
            </div>}
        </>
    )
}