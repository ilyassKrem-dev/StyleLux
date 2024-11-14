import { SetStateAction } from "react";
import { IoIosRefresh } from "react-icons/io";




export default function Refresh({refresh,setRefresh}:{
    refresh:boolean;
    setRefresh:React.Dispatch<SetStateAction<boolean>>
}) {

    return (
        <div className=" justify-center items-center flex flex-col h-full cursor-pointer group dark:text-white" onClick={() => setRefresh(true)}>
            <div className={` text-3xl ${refresh ? "animate-spin":""}`}>
                <IoIosRefresh />
            </div>
            <div className="flex flex-col  text-center font-medium">
                <p className=" cursor-pointer ">Something happened!</p>
                <p className=" cursor-pointer">Refresh</p>
            </div>
        
        </div>
    )
}