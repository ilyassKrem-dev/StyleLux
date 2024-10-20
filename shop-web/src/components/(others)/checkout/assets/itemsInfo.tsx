
import { useCartItems } from "../../../../lib/utils/hooks/hooks"



export default function ItemsInfo() {
    const [items] = useCartItems()
    const totalPrice = items.reduce((t,item) => t+(item.quantity*item.product.price),0)
    return (
        <div className="flex-1 bg-black/10 dark:bg-white/5 w-full p-5 lg:px-10">
            <div className="flex  md:flex-col gap-3 custom-scrollbar max-h-[400px]  md:pt-16 md:pb-10 md:overflow-y-auto md:overflow-x-hidden overflow-x-auto scrollbar-none md:scrollbar-thin custom-scrollbar">
                {items.length>0 && items.map((item,index) => {
                    const {product,quantity} = item
                    return (
                        <div key={index} className="flex items-center gap-3 flex-col md:flex-row">
                            <div className="pt-1 sm:hidden">

                            </div>
                            <div className="relative">
                                <div className="w-[120px] h-[137px] rounded-md relative">
                                    <img 
                                    src={product.media.url as string} 
                                    alt={product.name + " image"}
                                    className=" object-cover w-full h-full rounded-md" />
                                </div>
                                <div className="absolute -top-3 -right-3 rounded-full bg-accent  text-sm text-white w-[25px] h-[25px] flex justify-center items-center">
                                        {quantity > 9? "9+" : quantity}
                                </div>  
                            </div>
                            <div className="flex flex-col gap-1 max-w-[120px] text-center md:max-w-fit md:text-start">
                                <p className=" capitalize font-semibold dark:text-white">{product.name}</p>
                                <p className="font-bold text-sm dark:text-white">${(product.price*quantity).toFixed(2)}</p>
                            </div>
                        </div>
                    )
                })}
                
            </div>
            <div className="flex flex-col gap-2 font-semibold dark:text-white mt-5 pt-2 border-t border-black/40 dark:border-white/40">
                <div className="flex justify-between items-center">
                    <p>SubTotal</p>
                    <p>${totalPrice}</p>
                </div>
                <div className="flex justify-between items-center">
                    <p>Shipping</p>
                    <p>$20.00</p>
                </div>
                <div className="flex justify-between items-center">
                    <p>Total</p>
                    <p>${totalPrice + 20}</p>
                </div>
            </div>
        </div>
    )
}