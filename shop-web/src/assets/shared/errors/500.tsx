import {useLocation } from "react-router-dom";




export default function InternalServer() {
    const pathname = useLocation().pathname
    return (
        <div className="h-screen flex justify-center items-center dark:bg-dark">
            <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-2 items-center dark:text-white">
                    <h3 className=" font-bold text-4xl">500</h3>
                    <h1 className=" font-bold text-2xl text-center">Something happened!</h1>
                </div>
                <a href={pathname}>
                    <button className=" dark:bg-white w-full rounded-md py-2 bg-black text-white dark:text-black font-semibold dark:hover:bg-white/70 transition-all duration-300 hover:bg-black/70 active:scale-95">Reload</button>
                </a>
                
            </div>
        </div>
    )
}