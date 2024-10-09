import { Link } from "react-router-dom";
import { useSize } from "../../../lib/utils/hooks/hooks";
import { motion } from "framer-motion";

export default function TopHome() {
    const {w} = useSize()

    return (
        <div className="flex items-center gap-3 h-[600px]">
                {w>631&&
                <motion.div
                initial={{opacity:0}}
                animate={{opacity:1}}
                transition={{duration:3,ease:"easeInOut"}}
                className="flex-1 rounded-md bg-gray-300 dark:bg-white h-full">
                    <img 
                    src="/home/image1.png" 
                    alt="image"
                    loading="lazy"
                    className="w-full h-full object-cover " />
                </motion.div>}
                <div className="flex-1 flex flex-col gap-1 h-full">
                    <motion.div
                    initial={{opacity:0}}
                    animate={{opacity:1}}
                    transition={{duration:1,ease:"easeInOut"}} 
                    className="h-[130px] bg-rose-400 rounded-md">
                        <img 
                        src="/home/image2.png" 
                        alt="image"
                        loading="lazy"
                        className="w-full h-full object-cover rounded-md" />
                    </motion.div>
                    <div className="flex-1 flex flex-col gap-3 justify-start items-center">
                        <div className="h-[200px]">
                            <div className="relative flex items-center justify-center">
                                <h3 className=" font-medium text-[60px] sm:text-[90px] text-[#484848] dark:text-light h-fit">Ultimate</h3>
                                <h3 className="text-stroke text-transparent  text-[100px] absolute top-[5rem] dark:text-stroke-white">
                                    SALE
                                </h3>
                            </div>
                        </div>
                        <p className="text-lg font-medium dark:text-white">NEW COLLECTION</p>
                        <Link to={"/shop"}>
                            <button className="text-white dark:text-black bg-black rounded-md py-3 px-8 font-medium dark:bg-white active:scale-95 hover:bg-black/70 transition-all duration-300 dark:hover:bg-white/70">SHOP NOW</button>
                        </Link>
                    </div>
                    <motion.div
                     initial={{opacity:0}}
                     animate={{opacity:1}}
                     transition={{duration:2,ease:"easeInOut"}}  
                    className="h-[130px] bg-orange-300 rounded-md">
                        <img 
                        src="/home/image4.png" 
                        alt="image"
                        loading="lazy"
                        className="w-full h-full object-cover rounded-md" />
                    </motion.div>
                </div>
                {w>530&&
                <motion.div
                initial={{opacity:0}}
                animate={{opacity:1}}
                transition={{duration:5,ease:"easeInOut"}} 
                className="flex-1 rounded-md bg-gray-300 h-full dark:bg-white">
                    <img 
                    src="/home/image3.png" 
                    alt="image"
                    loading="lazy"
                    className="w-full h-full object-cover rounded-md" />
                </motion.div>}
            </div>
    )
}