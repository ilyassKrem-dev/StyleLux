import QuantityBtn from "../../../../assets/shared/misc/quantityButton"
import { CartItemsType } from "../../../../lib/utils/types/cartType"

const tableHeaders = [
    "Product",
    "Price",
    "Quantity",
    "Total"
]

export default function CartPageTable({items,handleQuantity,removeItem}:{
    items:CartItemsType[];
    handleQuantity:(arg1:"increase"|"decrease",arg2?:string) => void;
    removeItem:(arg:string) => void
}) {

    return (
        <table>
            <thead className="border-b-2 border-[#8A8A8A]/60">
                {tableHeaders.map((tab,index) => {
                    return (
                        <th key={index} className={`pb-6 ${index==0 ?"text-start" : index == tableHeaders.length -1 ? "text-end":""} dark:text-white`}>
                            {tab}
                        </th>
                    )
                })}
            </thead>
            <tbody className="border-b-2 border-[#8A8A8A]/60 max-h-[600px] overflow-y-auto">
                {items.length>0&&items.map((items,index) => {
                    const {quantity,product} = items
                    return (
                        <tr key={index} className=" dark:text-white">
                            <td className="py-5 w-fit">
                                <div className="flex gap-4 w-fit">
                                    <div className="w-[120px] sm:w-[150px] h-[200px] rounded-md">
                                        <img 
                                        src={product.media.url as string} 
                                        alt={product.name + " image"}
                                        className="w-full h-full object-cover rounded-md" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <h4 className=" break-words sm:max-w-[100px] font-bold lg:max-w-[400px]">{product.name}</h4>
                                        <div className="flex gap-1 text-[#8A8A8A] text-base dark:text-lighter">
                                            <p className="">Sizes:</p>
                                            <div className="flex gap-1">
                                                {product.sizes.join(",")}
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
                            </td>
                            <td className="py-5 text-center font-semibold align-top px-2">
                                ${product.price}
                            </td>
                            <td className="flex items-center justify-center py-5">
                                <div className="w-fit">
                                    <QuantityBtn 
                                    quantity={quantity} 
                                    handleQuantity={handleQuantity}
                                    productId={product.uid}/>
                                </div>
                            </td>
                            <td className="py-5 text-end font-bold align-top w-[80px]">
                                ${(quantity*product.price).toFixed(2)}
                            </td>
                        </tr>
                    )
                })}
                {items.length === 0&&<tr >
                    <td colSpan={4} className=" col-span-4 text-center font-bold lg h-[100px] dark:text-white">
                        No items in cart
                    </td>
                    
                </tr>}
            </tbody>
        </table>
    )
}