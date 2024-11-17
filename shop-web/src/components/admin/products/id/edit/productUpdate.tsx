import { SingleProductType } from "../../../../../lib/utils/types/productTypes"
import ProductForm from "../../../../../assets/shared/productForm/productForm"



export default function ProductUpdate({product}:{
    product:SingleProductType
}) {
   
    return (
        <ProductForm product={product}/>
    )
}