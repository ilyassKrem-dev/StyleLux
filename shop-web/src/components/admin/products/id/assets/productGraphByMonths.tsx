import { useEffect, useState } from "react"
import { useRefresh, useShow } from "../../../../../lib/utils/hooks/hooks"
import AdminProducts from "../../../../../lib/api/admin/products/AdminProducts"
import Refresh from "../../../shared/refresh"





export default function ProductChartByMonth({id}:{
    id:string|undefined
}) {
    const [sales,setSales] = useState<{month:string,year:string,sales:number,quantity:number}[]|null>(null)
    const [currentSale,setCurrentSale] = useState<{month:string,year:string,sales:number,quantity:number}>()
    
    const [show] = useShow()

    const [refresh,setRefresh] = useRefresh()

    useEffect(() => {
        const getSales = async() => {
            const res =await AdminProducts.getProductSales(id ??"")
            if(res?.success) {
                setSales(res.data.reverse())
                setCurrentSale(res.data[0])
            }
        }
        getSales()
    },[refresh,id])
    
    return(
        <div className="flex-1  text-black/80 dark:text-white">
            <div className="bg-white rounded-md p-4 dark:bg-dark border  dark:border-white/5 border-black/5 min-h-[190px]">
                {show&&sales&&
                <>
                    <h1 className="font-semibold text-lg">Sales chart</h1>
                    <div className="mt-8 flex items-end gap-4 h-full justify-between">
                        <div className="flex flex-col">
                            <p className="font-semibold text-2xl">${currentSale?.sales}</p>
                            <p className="font-semibold text-xl"><span className="text-lg text-black/40 dark:text-white/30">Sold: </span>{currentSale?.quantity}</p>
                            <p className=" font-semibold text-black/40 dark:text-white/30">{currentSale?.month} {currentSale?.year}</p>
                        </div>

                        <div className="h-[100px]">
                            <div className="flex gap-3 h-full border-b">
                                {sales.map((sale,index) => {
                                    
                                    const highestSale = sales.reduce((max,sa) => sa.sales >max.sales ? sa:max,sales[0])
                                    const percentage = (sale.sales/highestSale.sales)*100
                                    const selected = sale == currentSale
                                    return (
                                        <div key={index} className={`relative h-full bg-black/10 dark:bg-white/10 cursor-pointer w-[8px] hover:bg-black/50 dark:hover:bg-white/50 ${selected ?"border border-black/60 dark:border-white/60" :""}`} onClick={() => setCurrentSale(sale)}>
                                            <div className={`bg-black dark:bg-white absolute bottom-0 w-full`} style={{height:`${percentage}%`}} />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                </>}
                {show&&!sales&&<Refresh refresh={refresh} setRefresh={setRefresh}/>}
            </div>
        </div>
    )
}