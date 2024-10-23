
import { useDispatch, useSelector } from "react-redux";
import Title from "../../../assets/shared/misc/title";
import { RootState } from "../../../assets/redux/store";
import { useEffect, useState } from "react";
import { CartItemsType } from "../../../lib/utils/types/cartType";
import Cart from "../../../lib/api/product/cart/Cart";
import CartPageItems from "./assets/cartPageItems";
import { useSize, useTitle } from "../../../lib/utils/hooks/hooks";
import CartPageTable from "./assets/cartPageTable";
import { addQuantity, changeMaxQuatity, removeFromCart } from "../../../assets/redux/cart/cartReducer";
import { Link } from "react-router-dom";



export default function CartPage() {
    const itemsId = useSelector((state:RootState) => state.cart)
    const [items,setItems] = useState<CartItemsType[]|null>(null)
    const dispatch = useDispatch()
    useEffect(() => {
        const getItems = async() => {
            const res= await Cart.getCartProducts(itemsId)
            if(res?.success) return setItems(res.data)
            setItems([])
        }
        getItems()
    },[])
    const {w} = useSize()

    const handleQuantity = (type:"increase"|"decrease",uid?:string) => {
        if(!items) return
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
        setItems((prev:any) => {
            const newData = prev.map((item:CartItemsType) => {
                if(item.product.uid !== uid) return item
                return {...item,
                    quantity:type == "decrease" ? Math.max(item.quantity-1 ,1) :
                    Math.min(item.quantity+1 ,item.maxQuantity)}
            })
            return newData
        })
    }

    const removeItem = (uid:string) => {
        if(!items) return
        dispatch(removeFromCart(uid))
        setItems((prev:any) => prev.filter((item:CartItemsType) => item.product.uid !== uid))
    }
    const TotalPrice = items ? items.reduce((t,c) => t+(c.quantity * c.product.price),0).toFixed(2) : 0

    useTitle("Cart")
    return (
        <div className="py-12 md:py-24">
            <div className="max-w-[1100px] mx-auto">
                <Title title="Shopping Cart" link="Your shopping cart"/>
                {items&&
                <div className="flex gap-3 pt-16 flex-col">
                    {w<=500&&
                    <div className="p-2 border rounded-md border-[#8A8A8A] flex-1 min-h-[200px] max-h-[500px] overflow-y-auto custom-scrollbar">
                        {items.length==0&&
                        <div className="flex justify-center items-center h-full">
                            <h3 className="font-bold text-lg dark:text-white">No items in cart</h3>
                        </div>}
                        {items.length>0&&<CartPageItems items={items} 
                        handleQuantity={handleQuantity} 
                        removeItem={removeItem}/> }      
                    </div>}
                    {w>500&&
                    <CartPageTable 
                    items={items} 
                    handleQuantity={handleQuantity} 
                    removeItem={removeItem}/>}
                    <div className="flex flex-col gap-4 max-w-[400px] self-end w-full max-[500px]:self-center">
                        <div className="flex flex-col gap-3 pt-3  dark:text-white">
                            <div className="flex justify-between">
                                <p className=" font-semibold text-lg">Subtotal</p>
                                <p className="text-lg font-semibold">${TotalPrice}</p>
                            </div>
                            {items.length>0?
                            <Link to={"/cart/checkout"}>
                                <button className=" py-[0.7rem] w-full rounded-md bg-black text-white active:scale-95 hover:bg-black/40 dark:hover:bg-white/40 transition-all duration-300 font-medium dark:bg-white dark:text-black">Checkout</button>
                            </Link>
                            :
                            <button className=" py-[0.7rem] w-full rounded-md bg-black/60 text-white active:scale-95 hover:bg-black/40 dark:hover:bg-white/40 transition-all duration-300 font-medium cursor-default dark:bg-white/60"  disabled>Checkout</button>}
                        </div>
                    </div>
                </div>}

            </div>
        </div>
    )
}