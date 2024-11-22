//@ts-nocheck
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../../../redux/store"
import { SetStateAction, useEffect, useState } from "react"
import { CartItemsType } from "../../../../../../lib/utils/types/cartType"
import Cart from "../../../../../../lib/api/product/cart/Cart"
import { addQuantity, changeMaxQuatity, removeFromCart } from "../../../../../redux/cart/cartReducer"
import { motion } from "framer-motion"
import { useCartItems, useSize } from "../../../../../../lib/utils/hooks/hooks"
import CartItemsLg from "./cartItems/cartItemsLg"
import CartItemsSm from "./cartItems/cartItemsSm"
import { calculateDicount } from "../../../../../../lib/utils/random/random"

export default function CartItems({setShow}:{
    setShow:React.Dispatch<SetStateAction<boolean>>
}) {
    const [items,setItems] = useCartItems()
    const dispatch = useDispatch()
    const {w} = useSize()
    const handleQuantity = (type:"increase"|"decrease",uid?:string) => {
        const findItem = items.find(item => item.product.uid === uid)
        if(!findItem) return
        dispatch(changeMaxQuatity({
            uid:findItem.product.uid,
            maxQuantity:findItem.maxQuantity
        }))
        dispatch(addQuantity({
            uid:findItem.product.uid,
            type
        }))
        setItems(prev => {
            const newData = prev.map(item => {
                if(item.product.uid !== uid) return item
                return {...item,
                    quantity:type == "decrease" ? Math.max(item.quantity-1 ,1) :
                    Math.min(item.quantity+1 ,item.maxQuantity)}
            })
            return newData
        })
    }
    const removeItem = (uid:string) => {
        dispatch(removeFromCart(uid))
        setItems(prev => prev.filter(item => item.product.uid !== uid))
    }
    const TotalPrice = items.reduce((t,c) => t+(c.quantity * calculateDicount(c.product.price,c.product.discount)),0).toFixed(2)
    return (
        <motion.div
        initial={{opacity:0}} 
        animate={{opacity:1}} 
        exit={{opacity:0}}
        className="fixed top-0 bottom-0 right-0 left-0 bg-black/30 z-50 flex justify-end max-[500px]:items-end no-doc-scroll" onClick={() => setShow(false)}>
            <>
                {w>500&&
                <CartItemsLg 
                items={items}
                TotalPrice={TotalPrice}
                handleQuantity={handleQuantity}
                removeItem={removeItem}
                setShow={setShow}/>}
                {w<=500&&
                <CartItemsSm 
                items={items}
                TotalPrice={TotalPrice}
                handleQuantity={handleQuantity}
                removeItem={removeItem}
                setShow={setShow}/>}
            </>
        </motion.div>
    )
}