import { Link, useLocation } from "react-router-dom"




export default function ProductActions() {
    const pathname = useLocation().pathname
    return (
        <div className="flex-1 text-black/80 dark:text-white">
            <div className="bg-white rounded-md p-4 dark:bg-dark border  dark:border-white/5 border-black/5">
                <h1 className="font-semibold text-xl">Actions</h1>
                <div className="flex mt-8">
                    <div className=" flex justify-center items-center w-full gap-2">
                        <Link to={`${pathname}/edit`} className="flex-1">
                            <button className="w-full rounded-md py-2 bg-black text-white font-semibold dark:bg-white dark:text-black px-6 active:scale-95 hover:bg-black/70 dark:hover:bg-white/70 transition-all duration-300 flex-1">Edit Product</button>
                        </Link>
                        <button className="w-full rounded-md py-2 bg-black text-white font-semibold dark:bg-white dark:text-black px-6 active:scale-95 hover:bg-black/70 dark:hover:bg-white/70 transition-all duration-300 flex-1 capitalize">View full details</button>
                    </div>
                </div>
            </div>
        </div>
    )
}