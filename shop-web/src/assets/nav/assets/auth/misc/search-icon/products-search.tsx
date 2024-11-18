import { ChangeEvent, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { IoIosSearch } from "react-icons/io";
import { motion,AnimatePresence } from "framer-motion";
import { useOverlayRemove } from "../../../../../../lib/utils/hooks/hooks";
import { Link, useSearchParams } from "react-router-dom";
import { ProductType } from "../../../../../../lib/utils/types/productTypes";
import Product from "../../../../../../lib/api/product/Product";
import { useToast } from "../../../../../shared/wrappers/ToastWrapper";



export default function ProductsSearch() {
    const [searchParams,setSearchParams] = useSearchParams()
    
    const [show,setShow] = useState<boolean>(false)
    const [products,setProducts] = useState<ProductType[]>([])
    const searchV = searchParams.get("v")
    const {toast} = useToast()

   

    const handleSearch = (e:ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        const params = Object.fromEntries(searchParams)
        if(value) {
            params.v= value
        } else {
            delete params.v
        }
        setSearchParams(params)
    }


    useEffect(() => {
        if(!show) return
        const getProducts = async() => {
            const res = await Product.getProuctsByQuery(searchV??"")
            if(res?.success) {
                setProducts(res.data)
            } else {
                toast({varient:"error",desc:"Error getting search results"})
            }
        }
        getProducts()
    },[searchV,show])

    useOverlayRemove({
        tab:"searchP",
        setShow
    })
    return (
        <div className="relative searchP">
            <div className="text-[1.3rem] active:scale-95 cursor-pointer hover-opacity dark:text-white" onClick={() => setShow(prev => !prev)}>
                <IoIosSearch />
            </div>
                {ReactDOM.createPortal(
                <AnimatePresence>
                    {show&&<motion.div
                    initial={{y:-100,opacity:0}}
                    animate={{y:0,opacity:1}}
                    exit={{y:-100,opacity:0}}
                    transition={{duration:0.3}}
                    className="fixed z-[99999] flex justify-center items-center  left-0  right-0  max-[820px]:top-[4.3rem] top-9" onClick={() => setShow(false)}>
                        <div className="relative  w-[50%] max-[700px]:w-[70%] max-[500px]:w-[90%] searchP" onClick={(e) => e.stopPropagation()}>
                            <div className="relative w-full flex justify-center items-center ">
                                <input type="text" value={searchV??""} onChange={handleSearch} className="border rounded-full !p-1 w-full !pl-9" placeholder="Search..." />
                                <div className="absolute left-2 text-xl dark:text-white">
                                    <IoIosSearch /> 
                                </div>
                            </div>
                            {products.length>0&&<div className="absolute top-10 w-full rounded-md ">
                                <div className="w-full bg-white dark:bg-dark text-black/80 dark:text-white overflow-y-auto custom-scrollbar max-h-[350px] flex flex-col  border-2 border-black/10 dark:border-white/10 rounded-md max-[450px]:max-h-[300px]">
                                    {products.map((product,index) => {
                                        const {media,name,price,uid} = product
                                        return (
                                            <Link to={`/products/${uid}`} className={`flex items-center gap-3 cursor-pointer group hover:bg-black/10 dark:hover:bg-white/10 ${index==0 ?" rounded-tl-md" :"border-t dark:border-t-white/20"} `}>
                                                <div className="w-[70px] h-[100px] rounded-md">
                                                    <img 
                                                    src={media.url ?? ""} 
                                                    alt={name+" media"}
                                                    loading="lazy"
                                                    className={`w-full h-full object-cover border border-black/10 dark:border-white/10 ${index==0 ?" rounded-tl-md": ""}
                                                    ${(index==products.length-1 || products.length==1)?"rounded-bl-md": ""}
                                                    `} 
                                                    />
                                                </div>
                                                <div className="flex items-start flex-col">
                                                    <p className=" font-medium capitalize cursor-pointer">{name}</p>
                                                    <p className="text-sm font-medium cursor-pointer">${price}</p>
                                                </div>
                                            </Link>
                                        )
                                    })}
                                </div>
                            </div>}
                        </div>
                    </motion.div>}
                </AnimatePresence>,document.body)}
        </div>
    )
}