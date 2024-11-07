
import { IoSearch } from "react-icons/io5";



export default function TopDashboard() {

    return (
        <div className=" p-4 bg-white dark:bg-dark border-black/5 border rounded-md dark:border-white/5 pb-5 flex items-center gap-6 w-full">
            <h1 className="font-bold text-xl w-[150px] dark:text-white">Dashboard</h1>
            <div className="flex-1">
                <div className="relative max-w-[500px] flex justify-center items-center  mx-auto">
                    <input type="text" className=" border rounded-md w-full !p-2 max-full !bg-gray-400/5 !border-black/10 !pl-9 !dark:border-white/10 !dark:bg-black/5" placeholder="Search here.." />
                    <div className="absolute left-2 text-2xl dark:text-white">
                        <IoSearch />
                    </div>
                </div>
            </div>
            <div className="relative">
                <div className="w-[40px] h-[40px] rounded-full">
                    <img 
                    src="/profile.jpg" 
                    alt=""
                    className="w-full h-full rounded-full object-cover border border-dark/10 dark:border-white/10" />
                </div>
            </div>
        </div>
    )
}