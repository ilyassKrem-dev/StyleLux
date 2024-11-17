import { useEffect, useState } from "react"
import { useRefresh, useShow } from "../../../../../lib/utils/hooks/hooks"
import Refresh from "../../../shared/refresh";
import AdminProducts from "../../../../../lib/api/admin/products/AdminProducts";
import AllORders from "./misc/allOrders";
import OrderInfo from "./misc/ordersList";
import LoadingAnimation from "../../../../../assets/shared/loadingAnmation";


export type RecentOrdersType =  {
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
    const [showAll,setShowAll] = useState<boolean>(false)
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
                <div className="flex justify-between items-center border-b pb-2 border-black/20 dark:border-white/20">
                    <h2 className=" font-semibold text-lg text-black/70 dark:text-white/70">Recent Orders</h2>
                    {show&&recentOrders&&recentOrders?.length>0&&
                    <p className=" font-semibold active:scale-95 hover-opacity cursor-pointer" onClick={() => setShowAll(true)}>See all</p>}
                </div>
                <div className="mt-2 flex flex-col">
                    {show&&<>
                        {recentOrders?
                        <>
                        {recentOrders.length>0&&
                        recentOrders.map((order,index) => {
                            return (
                                <OrderInfo order={order} key={index} index={index}/>
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
                    {!show&&(
                        <div className="py-8">
                            <LoadingAnimation  className="!p-2"/>
                        </div>
                    )}
                </div>
            </div>
            {showAll&&<AllORders setShow={setShowAll} id={id}/>}
        </div>
    )
}