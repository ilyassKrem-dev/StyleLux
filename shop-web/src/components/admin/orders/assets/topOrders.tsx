import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import Orders from "../../../../lib/api/admin/orders/Orders";
import { OrdersType } from "../dashOrders";
import { Link } from "react-router-dom";
import { useOverlayRemove } from "../../../../lib/utils/hooks/hooks";




export default function TopOrders() {
    const [input,setInput] = useState<string>("")
    const [searchResults,setSearchResults] = useState<OrdersType[]>([])
    const [show,setShow] = useState<boolean>(false)
    useEffect(() => {
        const getSearchResults = async () => {
            const res = await Orders.getSearchResults(input)
            if(res?.success) {
                setSearchResults(res.data)
            }
        }
        getSearchResults()
    },[input])
    
    useOverlayRemove({
        tab:"order_search",
        setShow
    })
    return (
        <div className=" p-4 bg-white dark:bg-dark border-black/5 border rounded-md dark:border-white/5 pb-5 flex items-center gap-6 w-full">
            <h1 className="font-bold text-xl w-[150px] dark:text-white">Orders</h1>
            <div className="flex-1">
                <div className=" relative order_search" >
                    <div className="relative  flex justify-center items-center" onClick={() => setShow(true)}>
                        <input 
                        type="text"
                        id="orderSearch"
                        value={input}
                        onChange={(e) => setInput(e.target.value)} 
                        className=" border rounded-md w-full !p-2 max-full !bg-gray-400/5 !border-black/10 !pl-9 !dark:border-white/10 !dark:bg-black/5" placeholder="Search here.." />
                        <div className="absolute left-2 text-2xl dark:text-white">
                            <IoSearch />
                        </div>
                    </div>
                    {show&&searchResults.length>0&&<div className="absolute top-12 rounded-md left-0 right-0 z-30">
                        <div className="flex flex-col bg-white w-full border border-black/10 dark:border-white/10 shadow-md rounded-md dark:bg-dark dark:text-white">
                            {searchResults.map((result,index) => {
                                const {userName,id} = result
                                return (
                                    <Link onClick={() => setShow(false)} to={"/admin/orders/"+id} key={index} className={`flex items-center gap-2 p-2 hover:bg-black/20 cursor-pointer dark:hover:bg-white/20 ${(index==0&&searchResults.length>1) ? " rounded-t-md":(index == searchResults.length-1 && searchResults.length>1) ?"rounded-b-md":"rounded-md"}`}>
                                        <h2 className="font-semibold cursor-pointer">Order {id}:</h2>
                                        <div className="flex items-center gap-3 justify-between flex-1">
                                            <p className=" capitalize cursor-pointer">{userName}</p>
                                            <p className=" font-semibold cursor-pointer">${result.total}</p>
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>   
                    </div>}
                </div>
            </div>
            
        </div>
    )
}