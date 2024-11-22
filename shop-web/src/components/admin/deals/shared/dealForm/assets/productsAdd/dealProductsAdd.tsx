
import { SetStateAction } from "react";
import { ProductType } from "../../../../../../../lib/utils/types/productTypes";
import SearchProducts from "./searchProducts";





export default function DealProductsAdd({products,setProducts}:{
    products:ProductType[]
    setProducts:React.Dispatch<SetStateAction<ProductType[]>>
}) {

    const handleClick = () => {
        
    }

    
    return (
        <div className="bg-white dark:bg-dark rounded-md  border border-black/5 dark:border-white/5 transition-all duration-300 text-black/80 dark:text-white">
            <div className="flex flex-col  p-3">
                <h1 className=" font-semibold text-xl">Products</h1>
                <p className=" font-medium text-sm text-black/50 dark:text-white/50">Add the products that would have a deal</p>
            </div>
            <SearchProducts />
            <div className="p-3 border-t">

            </div>
        </div>
    )
}