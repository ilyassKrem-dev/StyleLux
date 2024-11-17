import { ChangeEvent, SetStateAction, useEffect, useState } from "react"
import Category from "../../../../../lib/api/category/Category"
import { useToast } from "../../../wrappers/ToastWrapper"
import { ErrorsType, basicInfoUpdateType } from "../misc/types/productInfo"


interface Props{
    basicInfo:basicInfoUpdateType
    setBasicInfo:React.Dispatch<SetStateAction<basicInfoUpdateType>>;
    error:string;
    setErrors:React.Dispatch<SetStateAction<ErrorsType>>
}


export default function BasicProductInfoUpdate({basicInfo,setBasicInfo,error,setErrors}:Props) {
    const {toast} = useToast()
    const [categories,setCategories] = useState<string[]|null>(null)


    useEffect(() => {
        const getCategoreis = async() => {
            const res =await Category.getAllCategories()
            if(res?.success) return setCategories(res.data.map(dat => dat.name))
            toast(
                {
                varient:"error",
                desc:res?.error ?? "Failed to get categories" })
        }
        getCategoreis()
    },[])
    
    const handleChange = (e:ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name,value} = e.target
        setBasicInfo(prev => ({...prev,[name]:value}))
        setErrors(prev => ({...prev,[name]:""}))
    }

    
    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2 text-black/80 dark:text-white">
                <label htmlFor="name" className="font-semibold text-center">Name</label>
                <div className="flex flex-col gap-1">
                    <input type="text" name="name" id="name" value={basicInfo.name} onChange={handleChange} className={`border rounded-md  dark:bg-transparent ${error ? "border-accent/80":"border-black/10 dark:border-white/10"}`} placeholder="Name" />
                    {error&&<p  className="h-[8px] text-sm font-medium text-accent">Name should be more than 3 character</p>}
                </div>
            </div>
            <div className="flex flex-col gap-2 text-black/80 dark:text-white">
                <label htmlFor="category" className="font-semibold text-center">Category</label>
                <select 
                value={basicInfo.category} 
                onChange={handleChange}
                name="category" 
                id="category" 
                className={`border rounded-md  dark:bg-transparent border-black/10 dark:border-white/10 capitalize`}>
                    {categories&&categories.map((cat,index) => {
                        return (
                            <option key={index} value={cat}>{cat}</option>
                        )
                    })} 
                    {!categories&&(
                        <option value="-1">....</option>
                    )}
                </select>
                
            </div>
        </div>
    )
}