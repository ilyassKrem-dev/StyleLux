import { useState } from "react";
import { LuRedo2 } from "react-icons/lu";
import { userOrderType } from "../../../../../lib/utils/types/userTypes";
import countries from "../../../checkout/assets/delivery/countriesList.json"
import { Link } from "react-router-dom";
import { changeDateFormat } from "../../../../../lib/utils/random/random";


export default function Order({order}:{
    order:userOrderType
}) {
    const [show,setShow] = useState<boolean>(false)
    const {product,total,address,placedAt} = order
    const country = countries.find(country => country.code == address.split('|')[0]) 
    return (
        <div className="flex flex-col border  border-black/20 rounded-md dark:text-white dark:border-white/20 gap-3">
            <div className={`p-2 hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300  ${show?" bg-black/5 dark:bg-white/5 border-b border-black/10 dark:border-white/10":""} cursor-pointer`} onClick={() => setShow(prev => !prev)}>
                <div className="flex items-start px-4 py-2 dark:text-white ">
                    <div className="flex gap-1 flex-col flex-1">
                        <p className="text-sm text-black/70 dark:text-white/70  cursor-pointer">Order placed</p>
                        <p className="text-base font-semibold  cursor-pointer">{changeDateFormat(placedAt)}</p>
                    </div>
                    <div className="flex gap-1 flex-col flex-1">
                        <p className="text-sm text-black/70 dark:text-white/70  cursor-pointer">Total</p>
                        <p className="text-base font-semibold  cursor-pointer">${total.toFixed(2)}</p>
                    </div>
                    <div className="flex gap-1 flex-col flex-1">
                        <p className="text-sm text-black/70 dark:text-white/70  cursor-pointer">Ship to</p>
                        <div className=" flex-col">
                            <p className="text-sm font-semibold  cursor-pointer text-black/70 dark:text-white/70">{country?.name},</p>
                            <p className="text-base font-semibold  cursor-pointer capitalize">{address.split('|')[1]}</p>
                        </div>
                    </div>
                    <div className="flex gap-1 flex-col flex-1">
                        <p className="text-sm  font-semibold  cursor-pointer break-words  max-[450px]:max-w-[150px]  max-[450px]:truncate">
                            Order # {order.uid}
                        </p>
                    </div>
                </div>
            </div>
            
            {show&&
            <div
            
            className="flex flex-col gap-12 px-12 py-4">
                {product.map((item,index) => {
                    return (
                    <div key={index} className="flex items-center gap-4 h-[170px]">
                        <div className="w-[120px] h-[170px] rounded-md">
                            <img 
                            src={item.media.url as string} 
                            alt={`${item.name} picture`}
                            className="w-full h-full object-cover rounded-md" />
                        </div>
                        <div className="flex flex-col justify-between h-full">
                            <div className="flex flex-col">
                                <p className="font-semibold text-lg max-w-[130px] truncate sm:max-w-[230px] md:max-w-[300px] lg:max-w-[400px] capitalize">{item.name}</p>
                                <p className="text-black/70 text-sm font-semibold dark:text-white/70">Quantity: 10</p>
                                <p className="text-black/70 text-sm font-semibold dark:text-white/70">Price: ${item.price.toFixed(2)}</p>

                            </div>
                            <div className="flex items-center ">
                                <Link to={`/products/${item.uid}`} target="_blank">
                                    <button className="flex gap-1 items-center font-semibold py-2 w-[180px] bg-black rounded-md text-white  justify-center hover:bg-black/70 dark:hover:bg-white/70 dark:text-black dark:bg-white transition-all duration-300 active:scale-95">
                                        <span>
                                            <LuRedo2/>
                                        </span>
                                        Buy it again
                                    </button>
                                
                                </Link>
                            </div>
                        </div>
                    </div>
                    )
                })}
            </div>}
            
        </div>
    )
}