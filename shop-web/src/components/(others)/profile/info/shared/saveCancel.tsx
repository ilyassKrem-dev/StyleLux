import { useNavigate } from "react-router-dom"
import LoadingAnimation from "../../../../../assets/shared/loadingAnmation"



export default function SaveAndCancel({loading,disabled,handleSave}:{
    loading:boolean;
    disabled:boolean;
    handleSave:() => void
}) {

    const router = useNavigate()
    
    return (
        <div className="mt-10 flex flex-row justify-end items-center gap-4">
            <button onClick={() => router("/profile/info")} className=" font-semibold dark:text-white active:scale-95 rounded-full px-3 py-2 hover:bg-black/70 hover:text-white transition-all duration-300 dark:hover:text-black dark:hover:bg-white/70">
                Cancel
            </button>
            <button className="rounded-full text-white bg-black px-8 py-2 font-semibold active:scale-95 dark:bg-white dark:text-black hover:bg-black/70 dark:hover:bg-white/70 transition-all duration-300 disabled:cursor-default disabled:bg-black/50 dark:disabled:bg-white/50 disabled:active:scale-100"
            disabled={disabled}
            onClick={handleSave} 
            >
                {loading?<LoadingAnimation className="!p-2"/>:"Save"}
            
            </button>
        </div>
    )
}