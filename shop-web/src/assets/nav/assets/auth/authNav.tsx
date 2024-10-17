
import { Link, useLocation } from "react-router-dom";
import { useSize } from "../../../../lib/utils/hooks/hooks";
import { useEffect, useState } from "react";
import { motion,AnimatePresence } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";
import { tabsDeafaultAuth,tabsPages,tabsDeafaultAuthMobile } from "../tabs";





export default function AuthNav() {
    const [show,setShow] = useState<boolean>(false)
    const [next,setNext] = useState<boolean>(false)
    const pathname = "/" + useLocation().pathname.split("/")[1]
    const {w} = useSize()
    
    useEffect(() => {
        const overlayCheck = (e:any) => {
            const overlay = document.querySelector(`.tabs`)
            if(overlay && !overlay.contains(e.target)) {
                setShow(false)
                setNext(false)
            }
        }
        document.addEventListener("click",overlayCheck)
        return () => document.removeEventListener("click",overlayCheck)
    },[])
    return (
        <div className={`flex items-center gap-6 lg:gap-10  font-poppins justify-between ${w<=699 ?"" :"flex-1 "}`}>
            <>
                {w>699&&
                <>
                    {tabsDeafaultAuth.map((tab,index) => {
                        const {name,link} = tab
                    
                        return (
                            
                            <Link key={index} to={link} className="text-[16px] hover:opacity-80 transition-all duration-300 active:scale-95 dark:text-white relative group">
                                <span className="px-2">{name}</span>
                                
                                <div className={`absolute h-[1px] w-full bg-black dark:bg-white -bottom-1 ${pathname == link ? "block":"hidden"} group-hover:block transition-all duration-300`} />

                            </Link>

                        )
                    })}
                    <div className="relative cursor-pointer group flex items-center justify-center tabs">
                        <div className="relative flex items-center justify-center" onClick={() => setShow(prev => !prev)}>
                            <div className="flex items-center gap-1 dark:text-white">
                                <span>Pages</span>
                                <IoIosArrowDown />
                            </div>
                        
                            <div className={`absolute h-[1px] w-full bg-black dark:bg-white -bottom-1 ${pathname == "/pages"? "block":"hidden"} group-hover:block transition-all duration-300`} />
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
                                    {tabsPages.map((tab,index) => {
                                        const {name,link} = tab
                                        return (
                                            <Link key={index} to={link} className="text-[16px] hover:opacity-80  duration-300 active:scale-95 p-1 hover:bg-black/10 rounded-md ">{name}</Link>

                                        )
                                    })} 
                                </div>
                            </motion.div>}

                        </AnimatePresence>
                    </div>
                </>
                }
                {w<=699&&<div className="relative flex justify-center items-center tabs">
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
                        className={`absolute bg-white rounded-md p-2 top-8 border border-black/10 shadow-md tabs`} >
                            <div className="flex flex-col gap-1 w-[200px] ">
                                {!next&&
                                <>
                                    {tabsDeafaultAuthMobile.map((tab,index) => {
                                        const {name,link} = tab
                                        return (
                                            <Link key={index} to={link} className="text-[16px] hover:opacity-80  duration-300 active:scale-95 p-1 hover:bg-black/10 rounded-md ">{name}</Link>

                                        )
                                    })}
                                    <div  className="text-[16px] hover:opacity-80  duration-300 active:scale-95 p-1 hover:bg-black/10 rounded-md flex justify-between items-center" onClick={(e) => {
                                        e.stopPropagation()
                                        setNext(true)}}>
                                        <span>Pages</span>
                                        <div className=" -rotate-90">
                                            <IoIosArrowDown />
                                        </div>
                                    </div>
                                </>}
                                {next&&
                                <>
                                    {tabsPages.map((tab,index) => {
                                        const {name,link} = tab
                                        return (
                                            <Link key={index} to={link} className="text-[16px] hover:opacity-80  duration-300 active:scale-95 p-1 hover:bg-black/10 rounded-md ">{name}</Link>

                                        )
                                    })}
                                    <div  className="text-[16px] hover:opacity-80  duration-300 active:scale-95 p-1 hover:bg-black/10 rounded-md flex justify-between items-center" onClick={(e) => {
                                        e.stopPropagation()
                                        setNext(false)}}>
                                        <span>Back</span>
                                        <div className="rotate-90">
                                            <IoIosArrowDown />
                                        </div>
                                    </div>
                                </>}
                            </div>
                        </motion.div>}

                    </AnimatePresence>
                </div>}
            </>
        </div>
    )
}