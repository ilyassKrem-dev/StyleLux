import { ChangeEvent, useState } from "react"
import { SingleProductType } from "../../../../../../lib/utils/types/productTypes"
import { useDispatch } from "react-redux"
import { addToCart } from "../../../../../../assets/redux/cart/cartReducer"
import QuantityBtn from "../../../../../../assets/shared/misc/quantityButton"




export default function AddToCart({product}:{
    product:SingleProductType
}) {
    const dispatch = useDispatch()
    const {quantity,sold} = product
    const [quantitySelected,setQuantitySelected] = useState<number>(quantity - sold === 0 ? 0:1)
    
    const handleQuantity = (type:"increase"|"decrease") => {
        const check = quantity - sold
        if(check === 0) return
        if(type == "increase") {
            if(quantitySelected >= check) return setQuantitySelected(check)
            return setQuantitySelected(prev => prev + 1)
        } else {
            if(quantitySelected === 1) return
            return setQuantitySelected(prev => prev - 1)
        }
        
        

    }

    const handleAddToCart = () => {
        dispatch(addToCart({
            uid:product.uid,
            quantity:quantitySelected,
            maxQuantity:quantity}))
    }
    return (
        <div className="flex flex-col gap-3"> 
            <div className="flex flex-col gap-1">
                <h3 className="  font-semibold text-lg dark:text-white">Quantity</h3>
                <div className="flex gap-5">
                    <QuantityBtn quantity={quantitySelected} handleQuantity={handleQuantity}/>
                    <button className="w-full py-1  border rounded-md border-black dark:border-white dark:text-white active:scale-95 hover:bg-black/40 dark:hover:bg-white/40 transition-all duration-300" onClick={handleAddToCart}>
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    )
}