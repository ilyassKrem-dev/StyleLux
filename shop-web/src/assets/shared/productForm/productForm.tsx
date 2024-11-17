import { useState } from "react"
import MediaUpdate from "./assets/mediaUpdate"
import { MediaType, SingleProductType } from "../../../lib/utils/types/productTypes"
import BasicProductInfoUpdate from "./assets/info-update/basicInfo"
import FinanceInfoUpdate from "./assets/info-update/financeInfo"
import GenderUpdate from "./assets/info-update/genderUpdate"
import SaveUpdate from "./assets/info-update/saveUpdate"
import { basicInfoUpdateType,FinanceInfoType,ErrorsType } from "./assets/misc/types/productInfo"


export default function ProductForm({product}:{
    product?:SingleProductType
}) {
    const [medias,setMedias] = useState<MediaType[]>(product?.media ?? [])

    const [basicInfo,setBasicInfo] = useState<basicInfoUpdateType>({
        name:product?.name ?? "",category:product?.category.name ?? ""
    })

    const [financeInfo,setFinanceInfo] = useState<FinanceInfoType>({
        price:product?.price ?? 0,
        quantity:product?.quantity ?? 0,
    })

    const [gender,setGender] = useState<"m"|"f"|"">(product?.gender ?? "")

    const [errors,setErrors] = useState<ErrorsType>(
        {
            name:"",
            price:"",
            quantity:"",
            gender:""
        }
    )
    return (
        <div className="flex gap-8 flex-col md:flex-row">
            <MediaUpdate medias={medias} setMedias={setMedias}/>
            <div className="flex flex-col bg-white rounded-md flex-1 p-5 dark:bg-dark">
                <BasicProductInfoUpdate 
                basicInfo={basicInfo} 
                setBasicInfo={setBasicInfo}
                error={errors.name}
                setErrors={setErrors}
                />
                <FinanceInfoUpdate 
                    financeInfo={financeInfo}
                    setFinanceInfo={setFinanceInfo}
                    errorPrice={errors.price}
                    errorQuantity={errors.quantity}
                    setErrors={setErrors}
                />
                <GenderUpdate 
                    gender={gender}
                    setGender={setGender}
                    error={errors.gender}
                    setErrors={setErrors}
                />
                <SaveUpdate 
                    medias={medias}
                    basicInfo={basicInfo} 
                    financeInfo={financeInfo}
                    gender={gender}
                    errors={errors}
                    setErrors={setErrors}
                />
            </div>
        </div>
    )
}