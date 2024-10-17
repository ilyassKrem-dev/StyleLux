import QuantityBtn from "../../../../assets/shared/misc/quantityButton"
import { CartItemsType } from "../../../../lib/utils/types/cartType"




export default function CartPageItems({items,removeItem,handleQuantity}:{
    items:CartItemsType[];
    handleQuantity:(arg1:"increase"|"decrease",arg2?:string) => void;
    removeItem:(arg:string) => void
}) {
    return (
        <div className="flex flex-col gap-3 dark:text-white">
            {items.map((item,index) => {
                const {product,quantity} = item
                return (
                    <div key={index} className={`flex gap-3 flex-col ${index !== items.length -1 ? "border-b-2  border-[#8A8A8A]/40 ":""} p-2 `}>
                        <div className="w-full h-[300px] rounded-md max-w-[250px] mx-auto">
                            <img 
                            src={product.media.url as string} 
                            alt={`${product.name} image`}
                            className="w-full h-full rounded-md object-cover" />
                        </div>
                        <div className="flex flex-col gap-1 py-2 flex-1 items-center">
                            <h6 className="font-semibold text-lg capitalize dark:text-white">{product.name}</h6>
                            <div className="flex gap-1 text-[#8A8A8A] text-base dark:text-lighter">
                                <p className="">Sizes:</p>
                                <div className="flex gap-1">
                                    {product.sizes.join(",")}
                                </div>
                            </div>
                            <p className=" font-semibold text-base dark:text-white">${product.price}</p>
                            <div className="flex-1 flex flex-col justify-end items-center">
                                <div className="flex items-center justify-between gap-8">
                                    <div className="w-fit">
                                        <QuantityBtn 
                                        quantity={quantity} 
                                        handleQuantity={handleQuantity}
                                        productId={product.uid}/>

                                    </div>
                                    <div className="flex flex-col font-semibold text-center">
                                        <h3 className="text-lg">Total:</h3>
                                        <p className="w-[80px]">${quantity*product.price}</p>
                                    </div>
                                </div>
                                <p className="
                                text-[#8A8A8A] 
                                active:scale-95 
                                underline cursor-pointer hover-opacity dark:text-lighter"
                                onClick={() => removeItem(product.uid)}
                                >Remove</p>
                            </div>                            
                            
                        </div>
                        
                    </div>
                )
            })}
        </div> 
    )
}