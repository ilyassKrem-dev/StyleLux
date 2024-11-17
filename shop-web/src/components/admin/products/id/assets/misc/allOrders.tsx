import { SetStateAction, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { RxCross2 } from "react-icons/rx";
import { RecentOrdersType } from "../productOrders";
import { useRefresh, useShow } from "../../../../../../lib/utils/hooks/hooks";
import AdminProducts from "../../../../../../lib/api/admin/products/AdminProducts";
import Refresh from "../../../../shared/refresh";
import OrderInfo from "./ordersList";
import LoadingAnimation from "../../../../../../assets/shared/loadingAnmation";




export default function AllORders({setShow,id}:{
    setShow:React.Dispatch<SetStateAction<boolean>>;
    id:string|undefined
}) {
    const [recentOrders,setRecentOrders] = useState<RecentOrdersType[]|null>(null)
    const divRef = useRef<HTMLDivElement>(null)
    const [show] = useShow()
    const [all,setAll] = useState<boolean>(false)
    const [page,setPage] = useState<number>(0)
    const [fetching,setFetching] = useState<boolean>(false)
    const [refresh,setRefresh] = useRefresh()

    const getRecentOrders = async(page:number) => {
        const res = await AdminProducts.getRecentOrders(id??"",page,"true")
        if(res?.success) {
            if(res.data.length==0) setAll(true)
            if(page ==0) {
                setRecentOrders(res.data)
            } else {
                setRecentOrders([...recentOrders ?? [],...res.data])
            }
        } else setRecentOrders([])
        return setFetching(false)
    }
    useEffect(() => {
        if(all) return
        setFetching(true)
        getRecentOrders(page)
    },[refresh,page,all])

    const handleScroll = () => {
        const current = divRef.current
        if(!current || all ||  fetching ) return
        const currentScroll = current.scrollHeight - (current.scrollTop + current.clientHeight)
        if(currentScroll===0) return setPage(prev => prev+1)
    }
    return (
        <>
            {ReactDOM.createPortal(
            <div className="fixed top-0 left-0 right-0 bottom-0 z-50 bg-black/30 flex justify-center items-center dark:bg-white/30" onClick={() => setShow(false)}>
                <div className="min-w-[300px] w-[500px] sm:w-[700px] md:w-[800px] rounded-md border border-black/5 dark:border-white/5 dark:bg-dark bg-white dark:text-white flex flex-col " onClick={(e) => e.stopPropagation()}>
                    <div className="relative flex justify-center items-center p-2 border-b border-black/10 dark:border-white/10">
                        <h1 className=" font-semibold text-xl dark:text-white">Recent Orders</h1>
                        <div className="absolute right-2 text-2xl active:scale-95 hover:bg-black/40 dark:hover:bg-white/40 transition-all duration-300 border rounded-full border-black/30 dark:border-white/40 p-1 cursor-pointer" onClick={() => setShow(false)}>
                            <RxCross2 />
                        </div>
                    </div>
                    <div className="max-h-[500px] overflow-y-auto custom-scrollbar max-[700px]:scrollbar-none" onScroll={handleScroll} ref={divRef}>
                        <div className="flex flex-col gap-3 p-2">
                        {show&&
                        <>
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
                </div>
            </div>
            ,document.body)}
        </>
    )
}