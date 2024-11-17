
import { useParams } from "react-router-dom"
import ProductDetails from "./assets/productDetails"
import ProductChartByMonth from "./assets/productGraphByMonths"
import ProductActions from "./assets/misc/productActions"
import { useTitle } from "../../../../lib/utils/hooks/hooks"
import ProductOrders from "./assets/productOrders"




export default function AdminProductById() {
    const {id} = useParams()
    
    useTitle(`Admin | P:${id}`)
    return (
        <div className=" mt-5 bg-white/10 dark:bg-dark/10 rounded-md ">
            <div className="flex gap-6 flex-col sm:flex-row">
                <div className="flex flex-col gap-4 flex-1">
                    <ProductActions/>
                    <ProductChartByMonth id={id}/>
                </div>
                <ProductDetails id={id}/>
            </div>
            <ProductOrders id={id}/>
        </div>
    )
}