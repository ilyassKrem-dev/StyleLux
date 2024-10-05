


import { Link } from "react-router-dom";
import { useSize } from "../../lib/utils/hooks/hooks";
import { useState } from "react";
import { motion,AnimatePresence } from "framer-motion";

const tabs = [
    {
        name:"Sign in",
        link:"login"
    },
    {
        name:"New arrivals",
        link:"arrivals"
    },
    {
        name:"Deals",
        link:"deals"
    },
    {
        name:"Home",
        link:"/"
    },
]
export default function Nav() {
    const [show,setShow] = useState<boolean>(false)
    const {w} = useSize()
    return (
        <div className="fixed top-0 left-0 right-0  p-8">
            <div className="flex items-center justify-between">
            
                <Link to={"/"}  className=" font-volkhov text-4xl font-semibold cursor-pointer">Shop</Link>
                <div className="flex items-center gap-5 flex-row-reverse font-poppins">
                    
                    <Link to={"/signup"}>
                        <button className="px-7 p-2 rounded-md text-white bg-black font-normal text-[16px] active:scale-95 transition-all duration-300 hover:bg-black/50">Sign Up</button>
                    </Link>
                    {w>654&&tabs.map((tab,index) => {
                        const {name,link} = tab
                        return (
                            <Link key={index} to={link} className="text-[16px] hover:opacity-80 transition-all duration-300 active:scale-95">{name}</Link>

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
                            className="absolute bg-white rounded-md p-2 top-8 border border-black/10 shadow-md">
                                <div className="flex flex-col gap-1 w-[200px]">
                                    {tabs.map((tab,index) => {
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
            </div>
        </div>
    )
}