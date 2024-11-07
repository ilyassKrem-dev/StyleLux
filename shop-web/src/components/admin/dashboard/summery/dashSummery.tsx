

import { VscGraph } from "react-icons/vsc";
import { MdAddShoppingCart } from "react-icons/md";
import { AiOutlineProduct } from "react-icons/ai";
import { useEffect, useState } from "react";
import DashBoard from "../../../../lib/api/admin/dashboard/dashboard";
import { sessionType } from "../../../../lib/utils/types/authTypes";

type SummeryInfoType = {
    oldOrdersPending:number
    oldSales:number 
    oldShipping:number 
    ordersPending:number 
    sales:number 
    shipping:number;
    fetched:boolean 
}

export default function DashSummery({session}:{
    session:sessionType
}) {
    const [summeryInfo,setSummeryInfo] = useState<SummeryInfoType>({
        oldOrdersPending:0,
        oldSales:0 ,
        oldShipping:0,
        ordersPending:0, 
        sales:0, 
        shipping:0,
        fetched:false 
    })
    const {oldOrdersPending,oldSales,oldShipping,sales,shipping,ordersPending} = summeryInfo
    const calculatePercentageIncrease = (newValue: number, oldValue: number) => {
        if (oldValue === 0) return 0;
        return ((newValue - oldValue) / oldValue) * 100;
    };

    const formatPercentageChange = (percentage: number) => {
        if (percentage > 0) {
            return `+${percentage.toFixed(0)}% from yesterday`; 
        } else if (percentage < 0) {
            return `${percentage.toFixed(0)}% from yesterday`;
        }
        return '';
    };
    useEffect(() => {
        const getSummery = async() => {
            const res = await new DashBoard(session.uid).getSummery()
            if(res?.success) {
                const data = res.data as any
                data.fetched = true;
                setSummeryInfo(data)
            } else {
                setSummeryInfo(prev => ({...prev,fetched:true}))
            }
        }
        getSummery()
    },[session])
    return (
        <div className="flex flex-col gap-6 bg-white dark:bg-dark p-4 rounded-md">
            <div className="flex flex-col gap-1  font-medium">
                <h3 className="text-xl dark:text-white">Today's Sales</h3>
                <p className="text-sm text-black/50 dark:text-white/50">Sales Summery</p>
            </div>
            <div className="flex gap-3 flex-wrap">
                
                <div className="bg-light dark:bg-darker p-4 rounded-md border-black/5 dark:border-white/5 flex flex-col gap-8 flex-1 min-w-[250px]">
                    <div className="text-xl rounded-full bg-black text-white p-2 dark:text-black dark:bg-white w-fit">
                        <VscGraph />
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-2xl font-semibold dark:text-white">
                            ${sales.toFixed(0)}
                        </p>
                        <div className=" flex justify-between font-medium text-sm">
                            <p className=" capitalize text-black/50 dark:text-white/50">
                                Total sales
                            </p>
                            <p className=" dark:text-white">
                                {formatPercentageChange(calculatePercentageIncrease(sales,oldSales))}
                            </p>
                        </div>
                    </div>
                </div>  
                <div className="bg-light dark:bg-darker p-4 rounded-md border-black/5 dark:border-white/5 flex flex-col gap-8 flex-1 min-w-[250px]">
                    <div className="text-xl rounded-full bg-black text-white p-2 dark:text-black dark:bg-white w-fit">
                        <MdAddShoppingCart />
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-2xl font-semibold dark:text-white">
                            {ordersPending}
                        </p>
                        <div className=" flex justify-between font-medium text-sm">
                            <p className=" capitalize text-black/50 dark:text-white/50">
                                Orders Pending
                            </p>
                            <p className="dark:text-white">
                                {formatPercentageChange(calculatePercentageIncrease(ordersPending,oldOrdersPending))}
                            </p>
                        </div>
                    </div>
                </div> 
                <div className="bg-light dark:bg-darker p-4 rounded-md border-black/5 dark:border-white/5 flex flex-col gap-8 flex-1 min-w-[250px]">
                    <div className="text-xl rounded-full bg-black text-white p-2 dark:text-black dark:bg-white w-fit">
                        <AiOutlineProduct />
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-2xl font-semibold dark:text-white">
                            {shipping}
                        </p>
                        <div className=" flex justify-between font-medium text-sm">
                            <p className=" capitalize text-black/50 dark:text-white/50">
                                Products shipping
                            </p>
                            <p className="dark:text-white">
                                {formatPercentageChange(calculatePercentageIncrease(shipping,oldShipping))}
                            </p>
                        </div>
                    </div>
                </div> 
            </div>
        </div>
    )
}