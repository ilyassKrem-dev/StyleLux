import { ChangeEvent, SetStateAction } from "react";
import { FinanceInfoType, ErrorsType } from "../misc/types/productInfo";




interface Props {
    financeInfo:FinanceInfoType;
    setFinanceInfo:React.Dispatch<SetStateAction<FinanceInfoType>>;
    errorPrice:string;
    errorQuantity:string;
    setErrors:React.Dispatch<SetStateAction<ErrorsType>>

}


export default function FinanceInfoUpdate({financeInfo,setFinanceInfo,errorPrice,errorQuantity,setErrors}:Props) {

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        const {name,value} = e.target
        setFinanceInfo(prev => ({...prev,[name]:value}))
        setErrors(prev => ({...prev,[name]:""}))

    }
    return (
        <div className="flex flex-col gap-3 mt-2">
            <div className="flex flex-col gap-2 text-black/80 dark:text-white">
                <label htmlFor="price" className="font-semibold text-center">Price</label>
                <div className="flex flex-col gap-1">
                    <input type="number" min={0} step={0.01} name="price" id="price" value={financeInfo.price} onChange={handleChange} className={`border rounded-md  dark:bg-transparent ${errorPrice ? "border-accent/80":"border-black/10 dark:border-white/10"}`} placeholder="Price" />
                    {errorPrice&&<p  className="h-[8px] text-sm font-medium text-accent">Price shouldn&apos;t be 0</p>}
                </div>
            </div>
            <div className="flex flex-col gap-2 text-black/80 dark:text-white">
                <label htmlFor="quantity" className="font-semibold text-center">Quantity</label>
                <input type="number" min={0} step={1} name="quantity" id="quantity" value={financeInfo.quantity} onChange={handleChange} className={`border rounded-md  dark:bg-transparent ${errorQuantity ? "border-accent/80":"border-black/10 dark:border-white/10"}`} placeholder="Quantity" />
                {errorQuantity&&<p  className="h-[8px] text-sm font-medium text-accent">Quantity shouldn&apos;t be 0</p>}
                
            </div>
        </div>
    )
}