
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { SingleProductType } from "../../../lib/utils/types/productTypes";
import productJson from "./prduct.json"
import Product from "../../../lib/api/product/Product";
import ProductById from "./productById/productById";
import { useTitle } from "../../../lib/utils/hooks/hooks";


export default function ProductPage() {
    const {id} = useParams();
    const [product,setProduct] = useState<SingleProductType|null>(productJson as any)
   
    useEffect(() => {
        const getProduct = async () => {
            const res = await Product.getProduct(id as string)
            if(res?.success) {
                setProduct(res.data as any)
            }
        }
        getProduct()
    },[id])

    useTitle("Products")
    return ( 
        <div className="py-10 md:py-28 ">
            {product&&
        <ProductById product={product}/>}
            
        </div>
    )
}