import { useEffect, useState } from "react"
import { FaFilter } from "react-icons/fa"
import ReactDOM from "react-dom"
import { RxCross2 } from "react-icons/rx"
import FilterSize from "../../../filters/assets/filterSize"
import FilterGender from "../../../filters/assets/filterGender"
import FilterCategories from "../../../filters/assets/filterCategories"
import { SetURLSearchParams } from "react-router-dom"
import { motion , AnimatePresence } from "framer-motion"



export default function FilterSmallS({searchParams,setSearchParams}:{
    searchParams:URLSearchParams;
    setSearchParams:SetURLSearchParams
}) {

   
    const [show,setShow] = useState<boolean>(false)
    useEffect(() => {
        if(!show) return 
        document.documentElement.style.scrollbarGutter = "stable"
        
    },[show])
    return (
        <>
            <div className="flex items-center gap-2 text-lg font-semibold cursor-pointer group active:scale-95 " onClick={() => setShow(true)}>
                <p className=" cursor-pointer group-hover:opacity-80 transition-all duration-300 dark:text-white">Filters</p>
                <div className="text-xl bg-black text-white rounded-full p-2  group-hover:bg-black/70 transition-all duration-300 dark:bg-white dark:text-black dark:group-hover:bg-white/70">
                    <FaFilter />
                </div>
            </div>
           
                {ReactDOM.createPortal(
                <AnimatePresence>
                    {show&&
                    <motion.div
                    initial={{opacity:0}}
                    animate={{opacity:1}}
                    exit={{opacity:0}} 
                    className="fixed top-0 bottom-0 right-0 left-0 z-50 bg-white/50 flex items-end no-doc-scroll dark:bg-black/50" onClick={() => setShow(false)}>
                        <motion.div
                        initial={{y:"100%"}}
                        animate={{y:"0%"}} 
                        exit={{y:"100%"}}
                        transition={{duration:0.3,ease:"easeInOut"}}
                        className="w-full h-[70%] rounded-t-xl flex flex-col gap-3 bg-lighter dark:bg-dark  border border-black/20 dark:border-white/20" onClick={(e) => e.stopPropagation()}>
                            <div className="flex justify-center items-center relative p-4 border-b border-black/20  bg-white dark:bg-dark dark:text-white dark:border-white/20">
                                <h3 className=" font-bold text-xl">Filters</h3>
                                <div className=" absolute text-xl right-5 cursor-pointer border rounded-full p-2 hover:bg-black/30 active:scale-95 transition-all duration-300 dark:hover:bg-white/30" onClick={() => setShow(false)}>
                                    <RxCross2 />
                                </div>
                            </div>
                            <div className="flex flex-col gap-3 items-center justify-center">
                                <div className="bg-white w-full rounded-xl p-4 border border-black/20 shadow-sm dark:bg-dark  dark:border-white/20">
                                    <FilterSize 
                                    searchParams={searchParams} 
                                    setSearchParams={setSearchParams}
                                    isOverlay
                                    />

                                </div>
                                <div className="bg-white w-full rounded-xl p-4 border border-black/20 shadow-sm dark:bg-dark  dark:border-white/20">
                                    <FilterGender 
                                    searchParams={searchParams} 
                                    setSearchParams={setSearchParams}
                                    isOverlay/>
                                </div>
                                <div className="bg-white w-full rounded-xl p-4 border border-black/20 shadow-sm dark:bg-dark  dark:border-white/20">
                                    <FilterCategories 
                                    searchParams={searchParams} 
                                    setSearchParams={setSearchParams}
                                    isOverlay
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>}
                </AnimatePresence>
                
                ,document.body)}
            

        </>
    )
}