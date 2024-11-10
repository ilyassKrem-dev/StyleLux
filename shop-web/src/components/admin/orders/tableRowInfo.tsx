import { Link } from "react-router-dom"
import { OrdersType } from "./dashOrders"
import React, { useState } from "react"
import NameHovering from "./assets/nameHovering"
import { useSize } from "../../../lib/utils/hooks/hooks"



const NameHoveringMemo = React.memo(NameHovering)
export default function TableRowInfo({order}:{
    order:OrdersType
}) {
    const [hover,setHover] = useState<boolean>(false)
    const {id,userName,userId,total,status} = order
    const {w} = useSize()
    return (
        <tr >
            <td className="w-[90px] text-center border-r dark:border-white/50 border-black/50 dark:text-white font-medium truncate max-w-[90px] px-1">
                {id}
            </td>
            <td className="flex-1 border-r p-2 dark:border-white/50 border-black/50   text-center underline  dark:text-white">
                <div className=" w-fit mx-auto relative flex justify-center items-center" 
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}>
                    <p className=" capitalize">{userName}</p>
                    {w>700&&hover&&<NameHoveringMemo userId={userId}/>}

                </div>
            </td>

            <td className={`flex-1 border-r p-2 w-[80px] dark:border-white/50 border-black/50 max-[400px]:hidden text-center dark:text-white font-semibold ${status == "pending" ? "text-blue-400": status == "shipping" ?"text-green-400":status=="refunded"?"text-black/50 dark:text-white/50":""}`}>
                {status}
            </td>

            <td className="flex-1 border-r p-2 w-[80px] dark:border-white/50 border-black/50 max-[900px]:hidden text-center dark:text-white">
                ${total.toFixed(1)}
            </td>
            <td className="flex-1 flex justify-center items-center p-2 w-[120px]">
                <Link to={`/admin/orders/${id}`}>
                    <button className="rounded-md py-2 px-2 text-white bg-black dark:bg-white dark:text-dark active:scale-95 hover:bg-dark/70 hover:dark:bg-white/70 transition-all duration-300 font-semibold text-sm">
                        View more
                    </button>
                </Link>
                
            </td>
        </tr>
    )
}