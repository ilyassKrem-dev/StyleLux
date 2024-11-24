import { useEffect, useState } from "react"




export default function ProductDealTime({dealEndDate}:{
    dealEndDate:string
}) {    
    const [dealTime,setDealTime] = useState<number>(0)
    useEffect(() => {
        const currentDeal = new Date(dealEndDate).getTime()
        const id = setInterval(() => {
            const currentTime = new Date().getTime()
            setDealTime(currentDeal - currentTime)
        },1000)
        return () => clearTimeout(id)
    },[dealEndDate])

    const days = Math.floor(dealTime / (1000 * 3600 * 24)).toString();

    const hours = Math.floor((dealTime % (1000 * 3600 * 24)) / (1000 * 3600)).toString(); 

    const minutes = Math.floor((dealTime % (1000 * 3600)) / (1000 * 60)).toString();

    const sec = Math.floor((dealTime % (1000 * 60)) / 1000).toString(); 
    if(dealTime <0) return
    return (
        <div className="my-2">
            <div className="p-3 bg-[#FDEFEE] font-volkhov flex items-center justify-between font-medium max-[380px]:flex-col">
                <p className="text-[#FF706B]">Hurry up! Sale ends in:</p>
                <div className="flex items-center gap-2 text-[#FF706B]">
                    <div className="flex items-center">
                        <p className="digit">{days.charAt(1) ? days.charAt(0):0}</p>
                        <p className="digit">{days.charAt(1) ? days.charAt(1):days.charAt(0)}</p>
                    </div>
                    <span>:</span>
                    <div className="flex items-center">
                        <p className="digit">{hours.charAt(1) ? hours.charAt(0):0}</p>
                        <p className="digit">{hours.charAt(1) ? hours.charAt(1):hours.charAt(0)}</p>
                    </div>
                    <span>:</span>
                    <div className="flex items-center">
                        <p className="digit">{minutes.charAt(1) ? minutes.charAt(0):0}</p>
                        <p className="digit">{minutes.charAt(1) ? minutes.charAt(1):minutes.charAt(0)}</p>
                    </div>
                    <span>:</span>
                    <div className="flex items-center">
                        <p className="digit">{sec.charAt(1) ? sec.charAt(0):0}</p>
                        <p className="digit">{sec.charAt(1) ? sec.charAt(1):sec.charAt(0)}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}