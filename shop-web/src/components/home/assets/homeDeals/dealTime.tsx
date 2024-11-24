import { useEffect, useState } from "react"




export default function DealTime({endDate}:{endDate:string}) {
    const [dateLeft,setDateLeft] = useState<number>(0)
    useEffect(() => {
        const date = new Date(endDate).getTime()
        const id = setInterval(() => {
            const currentDate = new Date().getTime()
            setDateLeft(date - currentDate)
        },1000)
        return () => clearTimeout(id)
    },[endDate])

    const days = Math.floor(dateLeft / (1000 * 3600 * 24)).toString();

    const hours = Math.floor((dateLeft % (1000 * 3600 * 24)) / (1000 * 3600)).toString(); 

    const minutes = Math.floor((dateLeft % (1000 * 3600)) / (1000 * 60)).toString();

    const seconds = Math.floor((dateLeft % (1000 * 60)) / 1000).toString(); 

    if(dateLeft<0) return
    return (
        <div className="flex gap-6 items-center font-digital text-black/80 dark:text-white">
            <div className="flex flex-col gap-2 items-center">
                <div className="bg-white dark:bg-dark rounded-md py-2 w-[56px] text-4xl font-medium shadow-[0px_0px_8px_0px_rgba(0,0,0,1)] text-center dark:shadow-[0px_0px_8px_0px_rgba(255,255,255,1)]">
                    <span className="digit">{days.charAt(1) ? days.charAt(0) : 0}</span>
                    <span className="digit">{days.charAt(1) ? days.charAt(1) : days.charAt(0)}</span>
                </div>
                <p className=" font-poppins text-xl">Days</p>
            </div>
            <div className="flex flex-col gap-2 items-center">
                <div className="bg-white dark:bg-dark rounded-md py-2 w-[56px] text-4xl font-medium shadow-[0px_0px_8px_0px_rgba(0,0,0,1)] text-center dark:shadow-[0px_0px_8px_0px_rgba(255,255,255,1)]">
                    <span className="digit">{hours.charAt(1) ? hours.charAt(0) : 0}</span>
                    <span className="digit">{hours.charAt(1) ? hours.charAt(1) : hours.charAt(0)}</span>
                </div>
                <p className=" font-poppins text-xl">Hr</p>
            </div>
            <div className="flex flex-col gap-2 items-center">
                <div className="bg-white dark:bg-dark rounded-md py-2 w-[56px] text-4xl font-medium shadow-[0px_0px_8px_0px_rgba(0,0,0,1)] text-center dark:shadow-[0px_0px_8px_0px_rgba(255,255,255,1)]">
                    <span className="digit">{minutes.charAt(1) ? minutes.charAt(0) : 0}</span>
                    <span className="digit">{minutes.charAt(1) ? minutes.charAt(1) : minutes.charAt(0)}</span>
                </div>
                <p className=" font-poppins text-xl">Mins</p>
            </div>
            <div className="flex flex-col gap-2 items-center">
                <div className="bg-white dark:bg-dark rounded-md py-2 w-[56px] text-4xl font-medium shadow-[0px_0px_8px_0px_rgba(0,0,0,1)] text-center dark:shadow-[0px_0px_8px_0px_rgba(255,255,255,1)]">
                    <span className="digit">{seconds.charAt(1) ? seconds.charAt(0) : 0}</span>
                    <span className="digit">{seconds.charAt(1) ? seconds.charAt(1) : seconds.charAt(0)}</span>
                </div>
                <p className=" font-poppins text-xl">Sec</p>
            </div>
        </div>
    )
}