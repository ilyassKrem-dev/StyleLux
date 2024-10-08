import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { Link, useLocation } from "react-router-dom"

import { useSize } from "../../../lib/utils/hooks/hooks"
import { tabsDefaultNoAuth } from "./tabs"



export default function NoAuthNav() {
    const [show,setShow] = useState<boolean>(false)
    const pathname = useLocation().pathname
    const {w} = useSize()
    return (
        <div className="flex items-center gap-5 flex-row-reverse font-poppins">
            <Link to={"/auth/signup"}>
                <button className="px-7 p-2 rounded-md text-white bg-black font-normal text-[16px] active:scale-95 transition-all duration-300 hover:bg-black/50 dark:text-black dark:bg-white dark:hover:bg-white/50">Sign Up</button>
            </Link>
            {w>654&&tabsDefaultNoAuth.map((tab,index) => {
                const {name,link} = tab
                return (
                    
                    <Link key={index} to={link} className="text-[16px] hover:opacity-80 transition-all duration-300 active:scale-95 dark:text-white relative group">
                        <span className="px-2">{name}</span>
                        
                        <div className={`absolute h-[1px] w-full bg-black dark:bg-white -bottom-1 ${pathname == link ? "block":"hidden"} group-hover:block transition-all duration-300`} />

                    </Link>

                )
            })}
            {w<=654&&<div className="relative flex justify-center items-center">
                <div className="flex flex-col gap-1 cursor-pointer hover:bg-opacity-80 group" onClick={() => setShow(prev => !prev)}>
                    {[...Array(3)].map((_,index) => {
                        return (
                            <div key={index} className="h-[2px] bg-black rounded-full w-[20px] group-hover:bg-black/50 transition-all duration-300 group-active:scale-95"> </div>
                        )
                    })}
                    
                </div>
                <AnimatePresence>
                    {show&&
                    <motion.div
                    initial={{opacity:0,scale:0.8}}
                    animate={{opacity:1,scale:1}}
                    exit={{opacity:0,scale:0.8}} 
                    transition={{duration:0.3,ease:"easeInOut"}}
                    className={`absolute bg-white rounded-md p-2 top-8 border border-black/10 shadow-md `}>
                        <div className="flex flex-col gap-1 w-[200px]">
                            {tabsDefaultNoAuth.map((tab,index) => {
                                const {name,link} = tab
                                return (
                                    <Link key={index} to={link} className="text-[16px] hover:opacity-80  duration-300 active:scale-95 p-1 hover:bg-black/10 rounded-md ">{name}</Link>

                                )
                            })} 
                        </div>
                    </motion.div>}

                </AnimatePresence>
            </div>}
        </div>
    )
}