import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { useRefresh, useShow } from "../../../../lib/utils/hooks/hooks"
import AdminDeals from "../../../../lib/api/admin/deals/AdminDeals"
import { useToast } from "../../../../assets/shared/wrappers/ToastWrapper"
import LoadingAnimation from "../../../../assets/shared/loadingAnmation"
import Refresh from "../../shared/refresh"
import { DealDetailsType } from "../../../../lib/utils/types/dealTypes"
import { calculateDicount, changeDateFormat } from "../../../../lib/utils/random/random"




export default function AdminDealById() {
    const {id} = useParams()
    const {toast} = useToast()
    const [deal,setDeal] = useState<DealDetailsType|null>(null)
    const [show] = useShow()
    const [refresh,setRefresh] = useRefresh()
    useEffect(() => {
        const getDeal = async() => {
            const res =await AdminDeals.getDeal(id??"")
            if(res?.success) {
                setDeal(res.data as any)
            } else {
                toast({varient:"error",desc:res?.error as string})
            }
        }
        getDeal()
    },[id,refresh])

    if(!show) {
        return (
            <div className=" h-full flex justify-center items-center pt-10">
                <LoadingAnimation />
            </div>
        )
    }
    if(show&&!deal) {
        return (
            <div className=" h-full flex justify-center items-center pt-10">
                <Refresh refresh={refresh} setRefresh={setRefresh}/>
            </div>
        )
    }

    return (
        <div className="h-full mt-5 text-black/80 dark:text-white">
            {show&&deal&&
            <>
                <div className="flex flex-col gap-1 items-center">
                    <p className=" font-medium text-2xl">{deal.name}</p>
                </div>
                <div className="mt-6 flex gap-3 flex-col md:flex-row">
                    <div className="bg-white rounded-md  flex-1 dark:bg-dark border border-black/20 dark:border-white/20 h-fit">
                        <h1 className="text-xl font-semibold text-center w-full border-b p-3 border-black/20 dark:border-white/20">Products</h1>
                        <div className="max-h-[500px] overflow-y-auto custom-scrollbar flex flex-col ">
                            {deal.products.map(( product,index) => {
                                const {media,name,price,discount} = product
                                return (
                                    <div key={index} className={`flex gap-2 items-center ${index == 0 ?"" :"border-t border-black/20 dark:border-white/20"}`}>
                                        <div className="w-[100px] h-[150px] rounded-md">
                                            <img 
                                            src={media.url ?? ""} 
                                            alt={product.name + " media"}
                                            className={`w-full h-full object-cover border border-black/20 dark:border-white/20 rounded-r-md`} />
                                        </div>
                                        <div className="flex flex-col gap-3  p-1 flex-1 ">
                                            <div className="flex flex-col flex-1">
                                                <p className=" capitalize break-words font-medium max-w-[200px]">{name}</p>
                                                <div className="flex items-center gap-2">
                                                    <p className=" font-medium text-lg">${calculateDicount(price,discount).toFixed(2)}</p>
                                                    <p className=" font-medium line-through text-black/60 dark:text-white/60 text-sm">${price}</p>
                                                </div>

                                            </div>
                                            <Link to={`/admin/products/${product.uid}`} className="flex-1 self-center">
                                                <button className=" text-white bg-black p-1 font-medium  rounded-md px-10  active:scale-95 hover:bg-black/80 dark:hover:bg-white/80 transition-all duration-300 dark:bg-white dark:text-black max-w-[250px] ">View Product</button>
                                            </Link>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="flex-1 bg-white rounded-md dark:bg-dark border border-black/20 dark:border-white/20 h-fit">
                        <h1 className="text-xl font-semibold text-center w-full border-b p-3 border-black/20 dark:border-white/20">Details</h1>
                        <div className="flex flex-col gap-2 p-3">
                            <div className="flex flex-col">
                                <h1 className=" font-semibold text-lg">Name:</h1>
                                <p className="font-medium">{deal.name}</p>

                            </div>
                            <div className="flex flex-col">
                                <h1 className=" font-semibold text-lg">Discount:</h1>
                                <p className="font-medium">{deal.discount}%</p>
                            
                            </div>
                            <div className="flex flex-col">
                                <h1 className=" font-semibold text-lg">Status:</h1>
                                <p className="font-medium capitalize">{deal.status}</p>
                            
                            </div>
                            <div className="flex flex-col">
                                <h1 className=" font-semibold text-lg">Starting date:</h1>
                                <p className="font-medium capitalize">{changeDateFormat(deal.startDate)}</p>
                            
                            </div>
                            <div className="flex flex-col">
                                <h1 className=" font-semibold text-lg">Ending date:</h1>
                                <p className="font-medium capitalize">{changeDateFormat(deal.endDate)}</p>
                            </div>
                        </div>
                        <Link to={`/admin/deals/${id}/edit`} className="max-[767px]:max-w-[500px] max-[767px]:mx-auto">
                            <button className="text-white bg-black p-2 font-medium  rounded-md px-10  active:scale-95 hover:bg-black/80 dark:hover:bg-white/80 transition-all duration-300 dark:bg-white dark:text-black w-full ">
                                Edit
                            </button>  
                        </Link>
                    </div>
                </div>
            
            </>}
        </div>
    )
}