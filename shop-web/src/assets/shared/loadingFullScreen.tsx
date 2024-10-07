import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"




export default function LoadingFullScreen() {
    const [time,setTime] = useState<boolean>(false)
    const pathname = useLocation().pathname
    useEffect(() => {
        const id = setTimeout(() => {
            setTime(true)
        },5000)
        return () => clearTimeout(id)
    },[time]) 
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-white dark:bg-dark">
            <div className="flex flex-col gap-3 items-center">
                <div className="p-4 rounded-full border-4 border-black border-r-white animate-spin dark:border-white dark:border-r-black">

                </div>
                {time&&<a href={pathname} className="text-black text-lg font-semibold cursor-pointer hover:opacity-60 transition-all duration-300 dark:text-white">Reload</a>}
            </div>

        </div>
    )
}