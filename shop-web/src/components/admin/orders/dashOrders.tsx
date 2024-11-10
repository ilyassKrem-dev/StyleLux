import { useEffect, useState } from "react";
import TopOrders from "./assets/topOrders";
import Orders from "../../../lib/api/admin/orders/Orders";
import { useSession } from "../../../assets/shared/wrappers/SessionWrapper";
import TableRowInfo from "./tableRowInfo";
import { useInfiniteScroll } from "../../../lib/utils/hooks/hooks";
import { Outlet } from "react-router-dom";

export type OrdersType = {
    id:number;
    uid:string;
    userName:string;
    userId:number;
    total:number;
    status:"shipping"|"compelted"|"refunded"|"pending";
}



export default function DashOrders() {
    
    
    return (
        <div className="flex flex-col gap-4 flex-1  max-w-[1200px] lg:mx-auto px-2 pt-32 lg:pt-12">
            <TopOrders />
            <Outlet />
        </div>
    )
}