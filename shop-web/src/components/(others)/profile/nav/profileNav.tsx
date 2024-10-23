import { Link, useLocation } from "react-router-dom"
import { useSize } from "../../../../lib/utils/hooks/hooks"
import { PiUserCircleFill,PiAddressBook,PiStarThin   } from "react-icons/pi";
import { TbTruckDelivery } from "react-icons/tb";

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

    return (
        <>
            {w<=1024&&<div className="flex gap-10 items-center justify-center  h-[41px]">
                <div className="fixed  left-0 right-0 flex justify-center items-center border-b bg-white dark:bg-dark z-40">
                    <div className="flex gap-10 items-center overflow-x-scroll scrollbar-none max-[450px]:pl-1 ">
                        {paths.map((path,index) => {
                            const isPath = pathname === path.link
                            return (
                                <Link to={path.link} key={index} className="p-2  relative cursor-pointer group ">
                                    <p className={`font-semibold text-black/80 dark:text-white/80  cursor-pointer group-hover:text-black transition-all duration-300 ${isPath ? "":"text-black/50"} w-fit text-nowrap `}>{path.path}</p>
                                    {isPath &&<div className="absolute bottom-0 right-0 left-0 bg-black h-[5px] rounded-t dark:bg-white " />}
                                    
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </div>}

            {w>1024&&
            <div className="w-[300px]">
                <div className="flex flex-col pt-8 fixed top-20 left-0 w-[300px]">
                    {paths.map((path,index) => {
                        const isPath = pathname == path.link
                        return (
                            <Link to={path.link} key={index} className={`flex gap-2 rounded-r-full p-[0.6rem] items-center font-semibold px-6 ${isPath ?"bg-dark text-white dark:bg-white dark:text-black" :" dark:text-white"} cursor-pointer`}>
                                
                                <div className="text-3xl">
                                    {path.icon}
                                </div>
                                <p className=" cursor-pointer">{path.path}</p>
                            </Link>
                        )
                    })}
                </div>
            </div>}
        </>
    )
}