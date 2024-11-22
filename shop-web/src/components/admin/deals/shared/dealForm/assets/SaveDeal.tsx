import { SetStateAction } from "react";
import { ProductType } from "../../../../../../lib/utils/types/productTypes";
import { DealInfoType, ErrorsDealType } from "../dealForm";
import { useToast } from "../../../../../../assets/shared/wrappers/ToastWrapper";
import AdminDeals from "../../../../../../lib/api/admin/deals/AdminDeals";





export default function SaveDeal({info,products,errors,setErrors}:{
    products:ProductType[]
    info:DealInfoType;
    setInfo:React.Dispatch<SetStateAction<DealInfoType>>;
    errors:ErrorsDealType;
    setErrors:React.Dispatch<SetStateAction<ErrorsDealType>>
}) {
    const {toast} = useToast()
    const {name,discount,startDate,endDate} = info
    const disabled = products.length === 0 || Object.values(errors).some(v => v)

    const handleSave = async() => {
        if(disabled) return
        const dateStart = new Date(startDate)
        const dateEnd = new Date(endDate)
        const errorsFound = {
            name:"",
            discount:"",
            startDate:"",
            endDate:""
        }
        if(!name) errorsFound.name = "Name is required"
        if(discount == 0)  errorsFound.discount = "Discount is required"
        if(discount>100) errorsFound.discount = "Max discount is 100"
        if(!startDate) errorsFound.startDate = "Start date is required"
        if(!endDate) errorsFound.endDate = "End Date is required"
        if(dateStart > dateEnd) errorsFound.endDate = "The start date sould'be after end date"
        if(products.length===0) return toast({varient:"error",desc:"Prducts are required"})
        if(Object.values(errorsFound).some(v => v)) return setErrors(errorsFound)

        const data = {
            productIds:products.map(product => product.id),
            name:name,
            discount:discount,
            startDate:dateStart.toISOString(),
            endDate:dateEnd.toISOString()
        }
        const res = await AdminDeals.AddDeal(data)
        if(res?.success) {
            toast({varient:"success",desc:"Deal has been added"})
        } else {
            toast({varient:"error",desc:res?.error as string})
        }

    }       
    return (
        <button className="flex-1 rounded-md font-medium text-white bg-black dark:bg-white dark:text-black p-2 active:scale-95 hover:bg-black/80 dark:hover:bg-white/80 transition-all duration-300 disabled:bg-black/50 disabled:dark:bg-white/50" onClick={handleSave} disabled={disabled}>Save</button>
    )
}