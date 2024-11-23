import { useState } from "react";
import DealProductsAdd from "./assets/productsAdd/dealProductsAdd";
import { ProductType } from "../../../../../lib/utils/types/productTypes";
import DealInfo from "./assets/dealInfo";
import { DealDetailsType } from "../../../../../lib/utils/types/dealTypes";

export type DealInfoType = {
    name:string;
    startDate:string;
    endDate:string;
    discount:number
}

export type ErrorsDealType = {
    name:string,
    endDate:string,
    discount:string,
    startDate:string
}
export default function DealForm({deal,edit}:{
    deal?:DealDetailsType;
    edit?:boolean
}) {
    const [products,setProducts] = useState<ProductType[]>(deal?.products ?? [])
    const [info,setInfo] = useState<DealInfoType>({
        name:deal?.name ?? "",
        startDate:deal?.startDate ?? "",
        endDate:deal?.endDate ?? "",
        discount:deal?.discount??0
    })
    const [errors,setErrors] = useState<ErrorsDealType>({
        name:"",startDate:"",endDate:"",discount:""
    })
    return (
        <div className=" mt-8 max-w-[1100px] flex flex-col">
            <h1 className=" text-center font-semibold text-2xl dark:text-white text-black/80">{edit?"Edit":"Add"} Deal</h1>
            <div className="flex md:flex-row flex-col mt-5 gap-4">
                <DealProductsAdd
                setProducts={setProducts} 
                products={products}/>
                <DealInfo 
                errors={errors}
                setErrors={setErrors}
                info={info} 
                setInfo={setInfo}
                products={products}
                edit={edit}
                />
            </div>
        </div>
    )
}