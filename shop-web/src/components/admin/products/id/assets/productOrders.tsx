import { useEffect, useState } from "react"
import { useRefresh, useShow } from "../../../../../lib/utils/hooks/hooks"
import Refresh from "../../../shared/refresh";
import AdminProducts from "../../../../../lib/api/admin/products/AdminProducts";


type RecentOrdersType =  {
    id:number;
    total:number;
    date:string;
    status:"pending"|"completed"|"refunded"|"shipping";
    clientName:string
}

export default function ProductOrders({id}:{
    id:string|undefined
}) {
    const [recentOrders,setRecentOrders] = useState<RecentOrdersType[]|null>(null)

    const [show] = useShow()
    const [refresh,setRefresh] = useRefresh()

    useEffect(() => {
        const getRecentOrders = async() => {
            const res = await AdminProducts.getRecentOrders(id ?? "")
            if(res?.success) {
                setRecentOrders(res.data)
            }
        }
        getRecentOrders()
    },[refresh,id])

    return (
        <div className="w-full  p-2 rounded-md mt-4 dark:text-white">
            <div className="flex flex-col">
                <div className="flex justify-between items-center">
                    <h2 className=" font-semibold text-lg text-black/70 dark:text-white/70">Recent Orders</h2>
                    <p className=" font-semibold active:scale-95 hover-opacity cursor-pointer">See all</p>
                </div>
                <div className="mt-2 flex flex-col">
                    {show&&<>
                        {recentOrders?
                        <>
                        {recentOrders.length>0&&
                        recentOrders.map((order,index) => {
                            const {status,id,clientName,total,date} = order
                            return (
                                <div key={index} className="flex justify-between items-center  border-t border-black/20 dark:border-white/20 p-2 dark:text-white/60 text-black/60 font-medium">
                                    <p className="flex-1 text-black/80">
                                        #{id}
                                    </p>
                                    <p className="flex-1">
                                        {clientName}
                                    </p>
                                    <p className="flex-1">
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
                        })}
                        {recentOrders.length==0&&(
                            <p className=" text-center mt-5 font-semibold text-xl w-full">
                                This product has no order
                            </p>
                        )}
                        </>
                        :
                        <Refresh refresh={refresh} setRefresh={setRefresh}/>}
                    </>}
                    
                </div>
            </div>
        </div>
    )
}