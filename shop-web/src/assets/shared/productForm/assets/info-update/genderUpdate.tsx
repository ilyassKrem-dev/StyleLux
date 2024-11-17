import { SetStateAction } from "react"
import { ErrorsType } from "../misc/types/productInfo";




export default function GenderUpdate({gender,setGender,error,setErrors}:{
    gender:"m"|"f"|""
    setGender:React.Dispatch<SetStateAction<"m"|"f"|"">>;
    error:string;
    setErrors:React.Dispatch<SetStateAction<ErrorsType>>
}) {
    const handleClick = (value:"m"|"f") => {
        setGender(value)
        setErrors(prev => ({...prev,gender:""}))
    }
    return (
        <div className="flex flex-col gap-3 dark:text-white text-black/80 mt-3">
            <h4 className=" font-semibold text-center">Gender</h4>
            <div className="flex justify-center items-center gap-4 font-medium">
                <div className={`rounded-md p-1 px-4 border border-black/30 cursor-pointer dark:border-white/10 ${gender === "m" ? " bg-gray-300/60":""}`} onClick={() => handleClick("m")}>
                    Male
                </div>
                <div className={`rounded-md p-1 px-4 border border-black/30 cursor-pointer dark:border-white/10 ${gender === "f" ? " bg-gray-300/60":""}`} onClick={() => handleClick("f")}>
                    Female
                </div>
            </div>
            {error&&<p className="text-center text-sm font-medium text-accent">{error}</p>}
        </div>
    )
}