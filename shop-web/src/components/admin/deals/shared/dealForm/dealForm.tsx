import { useState } from "react";
import DealProductsAdd from "./assets/productsAdd/dealProductsAdd";


export default function DealForm() {
    const [products,setProducts] = useState<number[]>([])
    return (
        <div className=" mt-12 max-w-[1100px] mx-auto">
            <div className="flex justify-between">
                <DealProductsAdd setProducts={setProducts} products={products}/>
            </div>
        </div>
    )
}