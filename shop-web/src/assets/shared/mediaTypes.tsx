
import { useState } from "react";
import { FaPlay } from "react-icons/fa";



export default function MediaTypes(
    {
        className,
        type,
        url,
        controls,
    }:{
        className?:string,
        type:"image"|"video",
        url:string,
        controls?:boolean,
    }
) {
    const [videoStart,setVideoStart] = useState<boolean>(false)
   if(type === "video") {
    return (
        <div className="relative flex justify-center items-center bg-black h-full w-full cursor-pointer" onClick={() => setVideoStart(prev => !prev)}>
            <video 
            src={url} 
            controls={controls}
             
            className={className}></video>
            {!videoStart&&
            <div className="absolute text-lg text-white/60">
                <FaPlay />
            </div>}
        </div>
    )
   } 
   if(type === "image") {
    return (
        <img 
        src={url} 
        alt="image"
        className={className} />
    )
   }
}