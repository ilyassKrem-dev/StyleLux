import { TbTruckDelivery } from "react-icons/tb";
import { useSession } from "../../../../assets/shared/wrappers/SessionWrapper"
import { PiAddressBook,PiStarThin   } from "react-icons/pi";
import { Link } from "react-router-dom";
import { useSize, useTitle } from "../../../../lib/utils/hooks/hooks";
const tabs = [
    {
        title:"Personal informations",
        link:"/profile/info",
        desc:"View and manage your personal information, including your contact details, address, and preferences. Keep your profile up-to-date for a personalized experience.",
        path:"Manage your personal inforamtion",
        icon:<PiAddressBook />
    },{
        title:"Orders",
        link:"/profile/orders",
        desc:"See the orders you made and track their status",
        path:"View orders",
        icon:<TbTruckDelivery />
    },{
        title:"Favorites",
        link:"/profile/favorites",
        desc: "Explore your favorite items and collections, easily accessible for quick reference and future purchases.",
        path:"Manage your favorites",
        icon:<PiStarThin />
    }
]

export default function ProfileHome() {
    const {session} = useSession()
    const {w} = useSize()
    useTitle("Profile")
    return (
        <div className="max-w-[1100px] mx-auto pt-8">
            <div className="flex flex-col gap-5 items-center justify-center">
                <div className="flex flex-col items-center dark:text-white font-semibold">
                    <p className="text-2xl">Welcome,</p>
                    <p className="text-3xl capitalize">{session.firstname} {session.lastname}</p>
                </div>
                <p className="text-lg break-words text-center dark:text-white">Here you can manage your personal info,orders and favorites</p>
            </div>
            <div className={` gap-5 mt-10   ${w<=768 ? "flex flex-col":" grid grid-cols-2 "}`}>
                {tabs.map((tab,index) => {
                    const {link,path,icon,desc,title} = tab
                    return (
                        <div key={index} className={`flex ${index == tabs.length -1 ?" col-span-2" :""} w-full gap-3  border rounded-lg  flex-col dark:text-white`}>
                            <div className="flex justify-between px-6 p-2 flex-1 gap-5">
                                <div className="flex gap-2 flex-col">
                                    <h3 className=" font-medium text-2xl break-words w-[150px] md:w-fit max-[450px]:text-xl">{title}</h3>
                                    <p className="max-w-[400px] text-base max-[450px]:text-sm">{desc}</p>
                                </div>
                                <div className="bg-black text-white rounded-lg text-6xl p-4 self-center dark:bg-white dark:text-black max-[400px]:text-5xl">
                                    {icon}
                                </div>
                            </div>
                            <Link to={link}>
                                <div className="px-6 py-3 border-t text-blue-500 font-medium hover:bg-black/5 rounded-b-lg dark:hover:bg-white/5 transition-all duration-300 active:bg-black/10 dark:active:bg-white/10 dark:text-blue-300 max-[450px]:text-sm">
                                    {path}
                                </div>
                            </Link>
                        </div>
                    )
                })}
                
            </div>
        </div>
    )
}