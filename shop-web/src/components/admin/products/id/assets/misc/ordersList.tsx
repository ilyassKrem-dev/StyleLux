import { Link } from "react-router-dom";
import { RecentOrdersType } from "../productOrders";




export default function OrderInfo({order,index}:{
    order:RecentOrdersType;
    index:number
}) {
    const {status,id,clientName,total,date} = order

    return (
        <div  className={`flex justify-between items-center   border-black/20 dark:border-white/20 p-2 dark:text-white/60 text-black/60 font-medium ${index !==0?"border-t":""}`}>
            <Link to={`/admin/orders/${id}`} className="flex-1 text-black/80 dark:text-white/80 underline" target="_blank">
                    #{id}
            </Link>
            <p className="flex-1">
                {clientName}
            </p>
            <p className="flex-1 hidden sm:block">
                {date}
            </p>
            <p className="flex-1">
                ${total}
            </p>
            <p className={` capitalize ${
                status=="shipping" ?"text-green-500" 
                : 
                status == "refunded" ? "text-black/40 dark:text-white/40":
                status == "pending" ? "text-blue-500":
                ""}`}>
                {status}
            </p>
        </div>
    )
}