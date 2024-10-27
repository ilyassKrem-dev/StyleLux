import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useSession } from "../../../../assets/shared/wrappers/SessionWrapper"
import Order from "./assets/order"
import User from "../../../../lib/api/user/User"
import { userOrderType } from "../../../../lib/utils/types/userTypes"


const OrderMemo = React.memo(Order)

export default function ProfileOrders() {
    const [orders,setOrders] = useState<userOrderType[]|null>(null)
    const [fetched,setFetched] = useState<boolean>(false)
    const [page,setPage] = useState<string>("0")
    const {session} = useSession()

    const getOrders = async(page:string="0") => {
        const res = await new User(session.uid).getUserOrders(page)
        if(res?.success) {
            if((res.data as any).length<8) {
                setFetched(true)
            }
            setOrders(res.data as any)
        }
    }
    useEffect(() => {
        if(fetched) return
        getOrders(page)
    },[session,page,fetched])
    const handleScroll = () => {
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const distanceFromBottom = documentHeight - (scrollTop + windowHeight);
        if(distanceFromBottom == 0) {
            if(orders &&orders?.length % 8 === 0) {
                setPage(prev => prev+1)

            }
        }
    }
    useEffect(() => {
        window.addEventListener("scroll",handleScroll)
        return () => window.removeEventListener("scroll",handleScroll)
    },[])
    return (
        <div className="max-w-[900px] mx-auto pt-8 flex-1" onScroll={handleScroll}>
            <div className="flex flex-col gap-1 items-center justify-center">
                <h1 className="font-semibold text-2xl capitalize dark:text-white">Orders</h1>
                <p className="break-words text-center dark:text-white">Here you can view your orders info</p>
            </div>
            <div className="mt-4">
                {orders&&
                <>
                    {orders.length===0&&
                    <div className="flex justify-center items-center pt-16 flex-col gap-3">
                        <p className="font-semibold text-xl dark:text-white">You have no orders</p>
                        <Link to={"/shop"} target="_blank">
                            <button className="text-white dark:text-black bg-black dark:bg-white rounded-md py-2 w-[200px] font-semibold transition-all duration-300 hover:bg-black/40 dark:hover:bg-white/40 active:scale-95">
                                Order now
                            </button>
                        </Link>
                    </div>}
                    {orders.length>0&&
                    <div className="flex flex-col gap-4">
                        {orders.map((order,index) => {
                            return (
                                <OrderMemo 
                                key={index} 
                                order={order} 
                                setOrders={setOrders}/>
                            )
                        })}
                    </div>}
                </>}
                
            </div>
        </div>
    )
}