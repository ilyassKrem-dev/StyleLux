import { motion } from "framer-motion"
import { RxCross2 } from "react-icons/rx"
import QuantityBtn from "../../../../../../shared/misc/quantityButton"
import { Link } from "react-router-dom"
import { CartItemsType } from "../../../../../../../lib/utils/types/cartType"
import { SetStateAction } from "react"


interface Props {
    items:CartItemsType[],
    setShow:React.Dispatch<SetStateAction<boolean>>,
    removeItem:(arg:string) => void,
    handleQuantity:(arg1:"increase"|"decrease",arg2?:string) => void,
    TotalPrice:string
}

export default function CartItemsLg({items,setShow,removeItem,handleQuantity,TotalPrice}:Props) {

    return (
        <motion.div
        initial={{x:"100%"}}
        animate={{x:"0%"}}
        exit={{x:"100%"}}
        transition={{duration:0.3,ease:"easeInOut"}}
        className="max-w-[500px] w-full bg-white dark:bg-dark h-full p-6 flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex  gap-2 justify-between">
                <h1 className="font-bold text-3xl dark:text-white">Shopping Cart</h1>
                <div className=" rounded-full text-lg p-2 border-black/20 border flex items-center justify-center hover:bg-black/20 dark:hover:bg-white/20 cursor-pointer active:scale-95 dark:text-white dark:border-white/20" onClick={() => setShow(false)}>
                    <RxCross2 />
                </div>
            </div>
            <div className="flex flex-col overflow-y-auto custom-scrollbar flex-1 mt-5 bg-white dark:bg-dark">
                {items.map((item,index) => {
                    const {product,quantity} = item
                    return (
                        <div key={index} className={`flex gap-3 ${index !== items.length -1 ? "border-b-2  border-[#8A8A8A] ":""} p-2 `}>
                            <div className="w-[150px] h-[220px] rounded-md">
                                <img 
                                src={product.media.url as string} 
                                alt={`${product.name} image`}
                                className="w-full h-full rounded-md object-cover" />
                            </div>
                            <div className="flex flex-col gap-1 py-3">
                                <h6 className="font-semibold text-lg capitalize dark:text-white">{product.name}</h6>
                                <div className="flex gap-1 text-[#8A8A8A] text-base dark:text-lighter">
                                    <p className="">Sizes:</p>
                                    <div className="flex gap-1">
                                        {product.sizes.join(",")}
                                    </div>
                                </div>
                                <p className=" font-semibold text-base dark:text-white">${product.price}</p>
                                <div className="w-fit">
                                    <QuantityBtn 
                                    quantity={quantity} 
                                    handleQuantity={handleQuantity}
                                    productId={product.uid}/>

                                </div>
                                <p className="
                                text-[#8A8A8A] 
                                active:scale-95 
                                underline cursor-pointer hover-opacity dark:text-lighter"
                                onClick={() => removeItem(product.uid)}
                                >Remove</p>
                            </div>
                            
                        </div>
                    )
                })}
            </div>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-3 pt-3 border-t border-[#8A8A8A] dark:text-white">
                    <div className="flex justify-between">
                        <p className=" font-semibold text-lg">Subtotal</p>
                        <p className="text-lg font-semibold">${TotalPrice}</p>
                    </div>
                    <Link to={"/cart/checkout"}>
                        <button className=" py-[0.7rem] w-full rounded-md bg-black text-white active:scale-95 hover:bg-black/40 dark:hover:bg-white/40 transition-all duration-300 font-medium dark:bg-white dark:text-black">Checkout</button>
                    </Link>
                    <Link to={"/cart"} onClick={() => setShow(false)}  className="text-center font-bold underline  hover-opacity active:scale-95">View Cart</Link>
                </div>
            </div>
        </motion.div>
    )
}