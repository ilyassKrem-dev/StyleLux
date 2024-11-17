import { Link, useLocation } from "react-router-dom"

import { SetStateAction, useEffect, useState } from "react";
import { MediaType } from "../../../../../lib/utils/types/productTypes";
import { useToast } from "../../../wrappers/ToastWrapper";
import AdminProducts from "../../../../../lib/api/admin/products/AdminProducts";
import Admin from "../../../../../lib/api/admin/Admin";
import { basicInfoUpdateType, FinanceInfoType, ErrorsType } from "../misc/types/productInfo";
import { handleErrors } from "../misc/utils";

interface Props {
    medias:MediaType[],
    basicInfo:basicInfoUpdateType;
    financeInfo:FinanceInfoType;
    gender:"m"|"f"|"";
    setErrors:React.Dispatch<SetStateAction<ErrorsType>>
    errors:ErrorsType
}



export default function SaveUpdate({medias,basicInfo,financeInfo,gender,setErrors,errors}:Props) {
    const {toast} = useToast()
    const pathname = useLocation().pathname.includes("edit")
    const getId = useLocation().pathname.split('/')[3]
    const [progress,setProgress] = useState<string>("")

    const disabled = !!progress || medias.length==0 || Object.values(basicInfo).some(v => v.length==0) || Object.values(financeInfo).some(v => v==0) || Object.values(errors).some(v => v)

    const uploadMedia = async(media:MediaType):Promise<MediaType> => {
        if(!media.file) return media

        const formData = new FormData()
        formData.append('file',media.file)

        const res= await Admin.uploadFile(formData)
        if(res?.success) {
            return {...media,url:res.data,file:undefined}
        } else {
            throw new Error("Failed to upload")
        }
    }
    const handleSaveOrAdd = async() => {
        const data = {
            name:basicInfo.name,
            category:basicInfo.category,
            price:financeInfo.price,
            quantity:financeInfo.quantity,
            gender:gender,
            medias:medias as MediaType[]
        }
        if(medias.length===0) return toast({varient:"error",desc:"At least one media is needed"})
        if(handleErrors(data,setErrors)) return
        
        
        try {
            setProgress("uploading...")
            const updatedMedias = await Promise.all(medias.map(media => uploadMedia(media)))
            if (updatedMedias.some((media) => !media?.url)) {
            return toast({ varient: 'error', desc: 'Failed to upload some media files' });
            }
            data.medias = updatedMedias
            setProgress("processing...")
            let res;
            if(pathname) {
                res = await AdminProducts.updateProduct(getId,data)
            } else {
                res = await AdminProducts.addProduct(data)
            }
            if(res?.success) {
                
                toast({varient:"success",desc:`Product has been ${pathname ?"updated" :"added"}`})
            }
            
        } catch (error:any) {
            toast({varient:"error",desc:error.message})
        } finally {
            setProgress("")
        }

    }
    return (
        <div className="flex-1 flex justify-center flex-col-reverse sm:items-end  sm:flex-row font-medium gap-3 mt-6">
            {pathname&&
            <Link to={`/admin/products/${getId}`} className="flex-1">
                <button className="py-2 w-full border rounded-md border-black/60 dark:border-white/60 active:scale-95 hover:bg-black/20 dark:hover:bg-white/20 transition-all duration-300 dark:text-white">
                    Cancel
                </button>
            </Link>}
            <button className="py-2 bg-black text-white dark:text-black/80 dark:bg-white rounded-md flex-1 active:scale-95 hover:bg-black/60 cursor-pointer dark:hover:bg-white/60 transition-all duration-300 disabled:cursor-default disabled:bg-black/40 disabled:active:scale-100 dark:disabled:bg-white/40" onClick={handleSaveOrAdd} disabled={disabled}>
                {progress ? progress : pathname ?"Save":"Add"}
            </button>
        </div>
    )
}