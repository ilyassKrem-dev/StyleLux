import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import LoadingAnimation from "../../../../../assets/shared/loadingAnmation"
import { useToast } from "../../../../../assets/shared/wrappers/ToastWrapper"
import { useShow, useRefresh } from "../../../../../lib/utils/hooks/hooks"
import { DealDetailsType } from "../../../../../lib/utils/types/dealTypes"
import Refresh from "../../../shared/refresh"
import AdminDeals from "../../../../../lib/api/admin/deals/AdminDeals"
import DealForm from "../../shared/dealForm/dealForm"
import { changeDateToStringInput } from "../../../../../lib/utils/random/random"




export default function AdminDealEdit() {
    const {id} = useParams()
    const {toast} = useToast()
    const [deal,setDeal] = useState<DealDetailsType|null>(null)
    const [show] = useShow()
    const [refresh,setRefresh] = useRefresh()
    useEffect(() => {
        const getDeal = async() => {
            const res =await AdminDeals.getDeal(id??"")
            if(res?.success) {
                let data = res.data as any
                data.startDate = changeDateToStringInput(data.startDate)
                data.endDate = changeDateToStringInput(data.endDate)
                setDeal(data)
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
        <>
            {show&&deal&&<DealForm deal={deal} edit/>}
        </>
    )
}