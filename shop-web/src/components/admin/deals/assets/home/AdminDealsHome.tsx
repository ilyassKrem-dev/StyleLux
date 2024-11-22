import { useEffect, useState } from "react"
import {useShow, useTitle } from "../../../../../lib/utils/hooks/hooks"
import LoadingAnimation from "../../../../../assets/shared/loadingAnmation"
import AdminDeals from "../../../../../lib/api/admin/deals/AdminDeals"
import AdminPagination from "../../../products/assets/adminPagination"
import React from "react"
import { Link, useSearchParams } from "react-router-dom"
import { DealType } from "../../../../../lib/utils/types/dealTypes"
import { changeDateFormat } from "../../../../../lib/utils/random/random"


const AdminPaginationMemo = React.memo(AdminPagination)

export default function AdminDealsHome() {
    const [deals,setDeals]= useState<DealType[]>([])
    const [max,setMax] = useState<{pages:number,deals:number}>({
        pages:1,deals:0
    })
    const [searchParams] = useSearchParams()
    const [show] = useShow()

    const currentPage = Number(searchParams.get("page")) ?? 0

    const changeCurrentPageToMax = currentPage ?(currentPage>max.pages ?max.pages :currentPage) :1


    useEffect(() => {
        const getAllDeals = async() => {
            const res= await AdminDeals.getAllDeals(changeCurrentPageToMax.toString())
            if(res?.success) {
                setDeals(res.data.deals)
                setMax(prev => ({...prev,pages:res.data.pages,
                                        deals:res.data.maxElements}))
            }
        }
        getAllDeals()
    },[changeCurrentPageToMax])

    useTitle("Admin | deals")
    return (
        <div className="mt-5 bg-white/50 dark:bg-dark/50 overflow-x-auto rounded-md">
            <div className="w-full bg-white dark:bg-dark rounded-md  min-w-[600px] p-3 border border-dark/5 dark:border-white/5">
                <table className="w-full min-w-[600px]">
                    <thead>
                        <tr className="flex items-center border-b pb-2 text-black/80 dark:text-white/80">
                            <th className="font-medium flex-1 ">Id</th>
                            <th className="font-medium flex-1 ">Name</th>
                            <th className="font-medium flex-1 ">Status</th>
                            <th className="font-medium flex-1 ">Start date</th>
                            <th className="font-medium flex-1 ">End date</th>
                            <th className="font-medium w-[80px]">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        show&&deals.length>0&&deals.map((deal,index) => {

                            const {id,name,status,startDate,endDate} = deal
                            return (
                                <tr key={index} className={`flex items-center  p-3 text-center text-black/80 dark:text-white/80 ${index != deals.length-1?"border-b" :""}`} >
                                    <td className="flex-1 capitalize">{name}</td>
                                    <td className="flex-1">{id}</td>
                                    <td className="flex-1 capitalize">{status}</td>
                                    <td className="flex-1">{changeDateFormat(startDate)}</td>
                                    <td className="flex-1">${changeDateFormat(endDate)}</td>
                                    <td className="w-[80px]">
                                        <Link to={`/admin/deals/${id}`}>
                                            <button className="border-2 rounded-md w-full border-black text-black font-medium dark:border-white dark:text-white active:scale-95 hover:bg-black/30 dark:hover:bg-white/30 transition-all duration-300 py-[0.2rem]">
                                                View
                                            </button>
                                        
                                        </Link>
                                    </td>
                                </tr>
                            )
                            
                        })
                    }
                    {!show&&(
                            <tr className=" py-12">
                                <td rowSpan={6}>
                                    <LoadingAnimation className="!p-3"/>
                                </td>
                                
                            </tr>   
                        )}
                        {show&&(deals.length==0)&&(
                            <tr>
                                <td rowSpan={6} className=" text-center py-12 font-medium">
                                    No Deals available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-between items-center p-2 max-[600px]:flex-col-reverse max-[600px]:gap-3">
                <p className="text-sm text-black/70 font-medium dark:text-white/70">Showing {changeCurrentPageToMax}-{deals.length} of {max.deals}</p>
                {max.pages>0&&<AdminPaginationMemo maxPage={max.pages}/>}
            </div>
        </div>
    )
}