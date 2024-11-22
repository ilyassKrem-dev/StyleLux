import { ChangeEvent, SetStateAction } from "react";
import { DealInfoType, ErrorsDealType } from "../dealForm"
import { useNavigate } from "react-router-dom";
import { ProductType } from "../../../../../../lib/utils/types/productTypes";
import SaveDeal from "./SaveDeal";





export default function DealInfo({info,setInfo,errors,setErrors,products}:{
    products:ProductType[]
    info:DealInfoType;
    setInfo:React.Dispatch<SetStateAction<DealInfoType>>;
    errors:ErrorsDealType;
    setErrors:React.Dispatch<SetStateAction<ErrorsDealType>>
}) {

    const {name,endDate,startDate,discount} = info
    const router = useNavigate()
    const handleChange= (e:ChangeEvent<HTMLInputElement>) => {
        const {name,value} = e.target
        if(name == "discount") {
            if(value.length>0&&!/\d/.test(value)) return
            setInfo(prev => ({...prev,[name]:Number(value)}));
        } else {
            setInfo(prev => ({...prev,[name]:value}))
        }
        setErrors(prev => ({...prev,[name]:""}))
    }

    return (
        <div className=" bg-white dark:bg-dark rounded-md p-3 flex-1 text-black/80 dark:text-white flex flex-col">
             <div className="flex flex-col">
                <h1 className=" font-semibold text-xl">Deal info</h1>
                <p className=" font-medium text-sm text-black/50 dark:text-white/50">Here you can change deal deatails</p>
            </div>
            <div className="flex flex-col gap-4 mt-5 border-t pt-1 border-black/20 dark:border-white/20">
                <div className="flex flex-col gap-1">
                    <label htmlFor="name" className=" font-semibold text-lg">Deal name</label>
                    <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={name} 
                    onChange={handleChange}
                    className={`!p-2 border rounded-md  ${errors.name  ?" border-accent" :"border-black/30 dark:border-white/30"}`}
                    placeholder="Name" />
                    <p className="text-sm text-accent/70 font-medium h-[8px]">{errors.name}</p>
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="discount" className=" font-semibold text-lg">Discount</label>
                    <div className="flex flex-col gap-1">
                        <div className=" relative flex justify-center items-center">
                            <input 
                            type="text" 
                            id="discount" 
                            name="discount"
                            min={0}
                            max={100} 
                            value={discount} 
                            onChange={handleChange}
                            className={`!p-2 border rounded-md  w-full !appearance-none ${errors.discount  ?" border-accent" :"border-black/30 dark:border-white/30"}`}
                            
                            placeholder="Dicount rate" />
                            <div className="absolute right-2 px-2 border-l border-black/30 dark:border-white/30 bg-white dark:bg-dark">
                                %
                            </div>
                            
                        </div>
                        <p className="text-sm text-accent/70 font-medium h-[8px]">{errors.discount}</p>
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="discount" className=" font-semibold text-lg">Start date</label>
                    <div className=" relative flex flex-col gap-1">
                        <input 
                        type="date" 
                        id="discount" 
                        name="startDate"
                        value={startDate}
                        onChange={handleChange}
                        className={`!p-2 border rounded-md  w-full !appearance-none ${errors.startDate  ?" border-accent" :"border-black/30 dark:border-white/30"}`}
                        
                        placeholder="Dicount rate" />
                        <p className="text-sm text-accent/70 font-medium h-[8px]">{errors.startDate}</p>

                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="discount" className=" font-semibold text-lg">End date</label>
                    <div className=" relative flex flex-col gap-1">
                        <input 
                        type="date" 
                        id="discount" 
                        name="endDate"
                        value={endDate}
                        onChange={handleChange}
                        className={`!p-2 border rounded-md  w-full !appearance-none ${errors.endDate  ?" border-accent" :"border-black/30 dark:border-white/30"}`}
                        
                        placeholder="Dicount rate" />
                        <p className="text-sm text-accent/70 font-medium h-[8px]">{errors.endDate}</p>

                    </div>
                </div>
            </div>


            <div className=" flex-1 flex items-end">
                <button className=" flex-1 font-medium dark:text-white active:scale-95 p-2" onClick={() => router(-1)}>Back</button>
                <SaveDeal 
                errors={errors} 
                setErrors={setErrors}
                info={info} 
                setInfo={setInfo}
                products={products}
                />
                
            </div>
        </div>
    )
}