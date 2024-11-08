import { IoSearch } from "react-icons/io5";




export default function TopOrders() {

    return (
        <div className=" p-4 bg-white dark:bg-dark border-black/5 border rounded-md dark:border-white/5 pb-5 flex items-center gap-6 w-full">
            <h1 className="font-bold text-xl w-[150px] dark:text-white">Orders</h1>
            <div className="flex-1">
                <div className="relative  flex justify-center items-center">
                    <input type="text" className=" border rounded-md w-full !p-2 max-full !bg-gray-400/5 !border-black/10 !pl-9 !dark:border-white/10 !dark:bg-black/5" placeholder="Search here.." />
                    <div className="absolute left-2 text-2xl dark:text-white">
                        <IoSearch />
                    </div>
                </div>
            </div>
            
        </div>
    )
}