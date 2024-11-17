import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { SingleProductType } from "../../../../../lib/utils/types/productTypes"
import Product from "../../../../../lib/api/product/Product"
import { useRefresh, useShow } from "../../../../../lib/utils/hooks/hooks"
import LoadingAnimation from "../../../../../assets/shared/loadingAnmation"
import Refresh from "../../../shared/refresh"
import ProductUpdate from "./productUpdate"



export default function EditProduct() {
    const {id} = useParams()
    const [product,setProduct] = useState<SingleProductType|null>(null)
    const [show] = useShow()
    const [refresh,setRefresh] = useRefresh()
    useEffect(() => {
        const getProductInfo = async() => {
            const res =await Product.getProduct(id??"null")
            if(res?.success) {
                setProduct(res.data as any)
            } else {
                setProduct(null)
            }
        }
        getProductInfo()
    },[id,refresh])
    return(
        <div className="pt-12">
            {show&&product&&(
                <ProductUpdate product={product}/>
            )}
            {show&&!product&&(
                <div className="h-full flex justify-center items-center">
                    <Refresh refresh={refresh} setRefresh={setRefresh}/>
                </div>
            )}
            {!show&&(
                <div className="h-full flex justify-center items-center">
                    <LoadingAnimation />
                </div>
            )}
        </div>
    )
}