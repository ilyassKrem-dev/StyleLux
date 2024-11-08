import { useEffect, useState } from "react";
import TopOrders from "./assets/topOrders";
import Orders from "../../../lib/api/admin/orders/Orders";
import { useSession } from "../../../assets/shared/wrappers/SessionWrapper";
import TableRowInfo from "./tableRowInfo";
import { useInfiniteScroll } from "../../../lib/utils/hooks/hooks";

export type OrdersType = {
    id:number;
    uid:string;
    userName:string;
    userId:number;
    total:number;
    items:number;
}



export default function DashOrders() {
    const [orders,setOrders] = useState<OrdersType[]|null>(null)
    const [page,setPage] = useState<number>(0)
    const [fetching,setFetching] = useState<boolean>(false)
    const [all,setAll] = useState<boolean>(false)
    const {session} = useSession()
    useEffect(() => {
        if(all) return
        const getOrders = async() => {
            const res =await new Orders(session.uid).getAllOrders();
            if(res?.success) {
                if(res.data.length < 15) setAll(true)
                setOrders(res.data)
                setFetching(false)
            } else {
                setOrders([])
            }
        }
        getOrders()
    },[page,session,fetching,all])


    useInfiniteScroll(
        {
            setFetching,
            setPage,
            all,
            fetching
        }
    )
    
    return (
        <div className="flex flex-col gap-4 flex-1  max-w-[1200px] lg:mx-auto px-2 pt-32 lg:pt-12">
            <TopOrders />
            <div className="mt-8 bg-white rounded-md  dark:bg-dark border dark:border-white/50 border-black/50 max-[700px]:overflow-x-auto">
                <table className="w-full border-collapse table-auto min:w-[500px]">
                    <thead>
                        <tr className=" text-black/70 dark:text-white/70 border-b dark:border-white/50 border-black/50">
                            <th className="w-[50px] font-medium border-r p-2 dark:border-white/50 border-black/50">
                                Order
                            </th>
                            <th className="font-medium flex-1 border-r p-2 dark:border-white/50 border-black/50 min:w-[150px]">
                                User
                            </th>
                            <th className="font-medium flex-1 border-r p-2 w-[80px] dark:border-white/50 border-black/50 max-[900px]:hidden">
                                Items
                            </th>
                            <th className="font-medium flex-1 border-r p-2 w-[80px] dark:border-white/50 border-black/50 max-[400px]:hidden">
                                Amount
                            </th>
                            <th className="flex-1 p-2 w-[120px] font-medium"> 
                               Details
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders&&orders.map((order,index) => {
                            return (
                            <TableRowInfo key={index} order={order}/>

                            )
                        })}
                    </tbody>
                    
                </table>
            </div>
        </div>
    )
}