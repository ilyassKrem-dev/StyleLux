import { SetStateAction, useState } from "react"
import { FaCircleInfo } from "react-icons/fa6"
import { useOverlayRemove } from "../../../../../lib/utils/hooks/hooks"
import ReactDOM from "react-dom"
import Cart from "../../../../../lib/api/product/cart/Cart"
import { userOrderType } from "../../../../../lib/utils/types/userTypes"
import LoadingAnimation from "../../../../../assets/shared/loadingAnmation"

export default function OrderSInfo({status,orderId,orderUid,itemsLength,setOrders}:{
    status:"pending" | "completed" | "refunded" | "shipping";
    orderId:number;
    orderUid:String;
    itemsLength:number;
    setOrders:React.Dispatch<SetStateAction<userOrderType[]|null>>;
}) {
    const [showInfo,setShowInfo] = useState<boolean>(false)
    const [show,setShow] = useState<boolean>(false)
    const [loading,setLoading] = useState<boolean>(false)

    const [data,setData] = useState<{
        show:boolean
        amount:number,
        status:string
    }>({
        show:false,
        amount:0,
        status:""
    })

    useOverlayRemove(
        {
            tab:"info_tab",
            setShow:setShowInfo
        }
    )
    const handleRefund = async() : Promise<void> => {
        if(loading) return
        setLoading(true)
        const res = await Cart.refundOrder(orderId)
        if(res?.success) {
            const info = res.data as any
            setData({
                show:true,
                amount:info.amount,
                status:info.success
            })
            setOrders((prev:any) => (prev?.map((order:userOrderType) => {
                return order.id == orderId ? {...order,status:"refunded"}:order
            })))
            setLoading(false)
        }
    }

    return (
        <div className="flex items-center gap-5">
            <div className="flex items-center gap-4 text-xs capitalize">
                <p className={`${
                    status == "shipping" 
                    ? 
                    " text-green-600"
                    : 
                    status =="completed" 
                    ?
                    "text-black dark:text-white font-semibold"
                    :
                    ""}
                    `}>
                        {status === "pending" 
                        ? 
                        "pending..."
                        :
                        status}
                </p>
                {status==="pending"&&
                <>
                    <span>|</span>
                    <p className="underline cursor-pointer text-black/70 font-bold active:scale-95 dark:text-white/70" onClick={
                        (e) => {
                            e.stopPropagation()
                            setShow(true)
                        }
                    }>Refund</p>
                
                </>}
            </div>

            {show&&ReactDOM.createPortal(
            <div className="fixed top-0 left-0 bottom-0 right-0 z-50 bg-black/30 dark:bg-black/50 flex justify-center items-center" onClick={() => setShow(false)}>
                <div className="w-[95%] sm:w-[80%] md:w-[500px] rounded-md bg-white border border-black/10 dark:border-white/20 dark:bg-dark text-dark dark:text-white p-4 px-6 flex flex-col gap-5 shadow-md" onClick={(e) => e.stopPropagation()}>
                    <div className="flex flex-col gap-1 items-center sm:items-start">
                        {!data.show
                        ?
                        <>
                            <h3 className=" font-semibold text-xl">Are you sure ?</h3>
                            <p className="text-sm text-black/70 dark:text-white/70  break-words text-center sm:text-start max-[380px]:w-[280px]">Refund of the order {orderUid},this action will refund your order of {itemsLength} item&#40;s&#41;</p>
                        </>
                        :
                        <>
                            <h3 className=" font-semibold text-xl">Order has been refunded</h3>
                            <div className="flex flex-col gap-1">
                                <p className="text-sm text-black/70 dark:text-white/70  break-words text-center sm:text-start max-[380px]:w-[280px]">Amount: <span>${(data.amount/100).toFixed(2)}</span></p>
                            </div>
                        </>}
                    </div>
                    <div className=" self-end flex items-center gap-4 flex-col sm:flex-row w-full sm:w-fit">
                        <button className=" bg-white text-dark p-[0.4rem] px-5 rounded-md border border-black/50 font-semibold hover:bg-white/70 active:scale-95 dark:hover:bg-dark/70 dark:border-white/50 dark:text-white dark:bg-dark w-full sm:w-fit" onClick={() => setShow(false)}>{data.show?"Close":"Cancel"}</button>
                        {!data.show&&<button className="bg-dark text-white p-[0.4rem] px-5 rounded-md border border-white/50 font-semibold hover:bg-black/70 active:scale-95 dark:hover:bg-white/70 dark:border-black/50 dark:text-dark dark:bg-white w-full sm:w-fit" onClick={handleRefund}>
                            
                            {loading
                            ?
                            <LoadingAnimation className=" !p-2 "/>
                            :
                            "Refund"}
                        </button>}
                    </div>
                </div>
            </div>,document.body)}



            <div className="relative flex justify-center items-center info_tab">
                <div className=" text-sm" onClick={(e) => {
                    e.stopPropagation()
                    setShowInfo(prev => !prev)}}>
                    <FaCircleInfo />
                </div>
                {showInfo&&<div className="absolute bg-black rounded-md p-1 px-2 dark:bg-white bottom-6 text-white dark:text-black text-xs w-[200px] flex gap-1 flex-col right-0">
                    <p>
                        <span className="underline font-semibold">Pending... </span>: Your order is being prepared; you can request refund if it's taks to long
                    </p>
                    <p> <span className=" underline font-semibold">Shipping</span>: Your order is getting shipped</p>
                    <p><span className=" underline font-semibold">Completed</span>: Your order has been delivered</p>
                </div>}
            </div>
        </div>
    )
}