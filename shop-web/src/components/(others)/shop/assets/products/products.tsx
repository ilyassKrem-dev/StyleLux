import { useEffect, useState } from "react"
import FilterShowen from "./assets/fllterShowen"
import Product from "../../../../../lib/api/product/Product"


export default function Products() {
    const [filterBy,setFitlerBy] = useState<string>(""
    )

    const [products,setProducts] = useState<any[]>([])
    const [loading,setLoading] = useState<boolean>(true)
    
    useEffect(() => {
        const getProducts = async() => {
            const res = await Product.getAllProduct()
            if(res?.success) {
                setProducts(res.data)
            } else {
                setProducts([])
            }
        }
        getProducts()
    },[])
    console.log(products)
    useEffect(() => {
        if(!loading) return
        const id = setTimeout(() => {
            setLoading(false)
        },300)

        return () => clearTimeout(id)
    },[loading])
    return (
        <div className="flex flex-col gap-5 self-start">
            <FilterShowen />
            <div className="flex flex-wrap gap-3">
                {!loading&&products.map((product,index) => {
                    return (
                        <div key={index}>
                            {product.name} + {product.price}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}