
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { SingleProductType } from "../../../lib/utils/types/productTypes";
import Product from "../../../lib/api/product/Product";
import ProductById from "./productById/productById";
import { useTitle } from "../../../lib/utils/hooks/hooks";
import NotFound from "../../../assets/shared/errors/404";
import NotFoundItem from "../../../assets/shared/errors/notFound";


export default function ProductPage() {
    const {id} = useParams();
    const [product,setProduct] = useState<SingleProductType|null>(null)
    const [show,setShow] = useState<boolean>(false)
    useEffect(() => {
        const getProduct = async () => {
            const res = await Product.getProduct(id as string)
            if(res?.success) {
                setProduct(res.data as any)
            }
        }
        getProduct()
    },[id])
    useEffect(() => {
        if(show) return
        const id = setTimeout(() => {
            setShow(true)
        },300)
        return () => clearTimeout(id)
    },[show])
    useTitle("Products")
    
    if(show&&!product) {
        return <NotFoundItem />
    }
    return ( 
        <div className="py-10 md:py-28 ">
        {show&&product&&
        <ProductById product={product}/>}
            
        </div>
    )
}