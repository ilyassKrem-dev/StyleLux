import {  CardNumberElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { CheckoutErrorsCheck, Deliverytype } from "../../../../../lib/utils/types/cartType";
import { SetStateAction, useState } from "react";
import ReactDOM from "react-dom";
import { RxCross2 } from "react-icons/rx";
import { useCartItems } from "../../../../../lib/utils/hooks/hooks";
import Cart from "../../../../../lib/api/product/cart/Cart";
import { StripeCardNumberElement } from "@stripe/stripe-js";
import { ValidatePayInfo, isError } from "../misc/ValidatePayInfo";
import { useDispatch } from "react-redux";
import { removeAll } from "../../../../../assets/redux/cart/cartReducer";
import { FaLock,FaLockOpen  } from "react-icons/fa";

interface Props{
    email:string;
    errorsCheck:CheckoutErrorsCheck,
    deliveryInfo:Deliverytype;
    userId:number;
    setErrorsCheck:React.Dispatch<SetStateAction<CheckoutErrorsCheck>>;
    setCompleted:React.Dispatch<SetStateAction<boolean>>
}

export default function PayBtn(
    {
    email, 
    errorsCheck, 
    setErrorsCheck,
    deliveryInfo,
    userId,
    setCompleted
}:Props){
    const [items] = useCartItems()
    const elements = useElements()
    const stripe = useStripe()
    const [show,setShow] = useState<boolean>(false)
    const [loading,setLoading] = useState<boolean>(false)
    const [errorMsg,setErrorMsg] = useState<string>("")
    const dispatch = useDispatch()
    
    const disableError =  isError(deliveryInfo,errorsCheck)

    const handlePay = async() => {
        if(loading  || !stripe ||!elements || errorMsg.length>0 || ValidatePayInfo({
            delivery:deliveryInfo,
              errorsCheck,
             setErrorsCheck
         }) ) return

        setLoading(true)

        const cardElemnt = elements.getElement(CardNumberElement) as StripeCardNumberElement

        const { paymentMethod, error } = await stripe.createPaymentMethod({
            element:cardElemnt,
            params:{
                billing_details:{
                    email
                }
            }
        });
        if(error) {
            setLoading(false)
            return setErrorMsg(error.message as string)
        }
            
        const res = await Cart.createCheckout(
            {
                email,
                fullname:deliveryInfo.firstname + "-" + deliveryInfo.lastname,
                userId,
                fullAddress:{
                    address:deliveryInfo.address,
                    city:deliveryInfo.city,
                    postalCode:deliveryInfo.postalcode,
                    region:deliveryInfo.country,
                    save:deliveryInfo.save
                },
                amount:items.reduce((t,item) => t+(item.product.price * item.quantity),0),
                paymentId:paymentMethod.id
            }
        )
        if(res?.success) {
            const paymentId = res.data.paymentId
            const result = await stripe.confirmCardPayment(paymentId,{
                payment_method:paymentMethod.id
            })
            if(result.error) {
                setErrorMsg(result.error.message as string)
                return setLoading(false)
            }
            const order = await Cart.createOrder(
                {
                    amount:items.reduce((t,item) => t+(item.product.price * item.quantity),0),
                    items:items.map(item => ({
                        productId:item.product.id,
                        quantity:item.quantity})),
                    paymentId:res.data.paymentId,
                    userId:userId,
                    location:{
                        address:deliveryInfo.address,
                        city:deliveryInfo.city,
                        postalCode:deliveryInfo.postalcode,
                        region:deliveryInfo.country,
                        save:deliveryInfo.save
                    }
                }
            )
            if(order?.success) {
                dispatch(removeAll())
                setShow(false)
                return setCompleted(true)
            }
        } else {
            setErrorMsg("Failed to add order,try again later or contact support.")
            return setLoading(false)
        }
    
    }   
  
    return (
        <>
            <button className="w-full py-3 text-base font-bold bg-black rounded-md dark:bg-white dark:text-black text-white hover:bg-black/30 dark:hover:bg-white/30 active:scale-95 transition-all duration-300 disabled:hover:bg-black disabled:dark:hover:bg-white flex items-center justify-center relative"
            disabled={disableError}
            onClick={() => setShow(true)}>
                Pay Now
                <div className="absolute right-5">
                    {disableError?<FaLock />:<FaLockOpen/>}
                </div>
            </button>

            {show&&ReactDOM.createPortal(
            <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center* items-center z-50 bg-black/30 dark:bg-white/30" onClick={() => setShow(false)}>
                <div className=" bg-white rounded-md w-[300px] h-fit md:w-[500px] mx-auto dark:bg-dark" onClick={(e) => e.stopPropagation()}> 
                    <div className="relative flex justify-center items-center p-3 border-b border-black/40 py-2 dark:border-white/40">
                        <h1 className="text-xl font-bold dark:text-white">Confirm</h1>
                        <div className="absolute right-2 rounded-full p-1 text-xl active:scale-95 border-2 hover:bg-black/30 dark:hover:bg-white/30 cursor-pointer transition-all duration-300 dark:text-white" onClick={() => setShow(false)}>
                            <RxCross2 />
                        </div>
                    </div>
                    
                    {!errorMsg
                    ?
                    <p className="p-6 font-medium text-lg dark:text-white">{loading ?"Processing... ?":"Confirm payment ?"}</p>
                    :
                    <p className="text-red-500 text-center font-semibold py-6">{errorMsg}</p>}
                    
                    <div className="flex justify-end items-center gap-5 px-3 border-t border-black/40 py-2 dark:border-white/40">
                        <button className="text-accent dark:text-accent/50 underline font-semibold active:scale-95 hover-opacity" onClick={() => setShow(false)}>Cancel</button>
                        <button className="p-2 text-base font-bold bg-black rounded-md dark:bg-white dark:text-black text-white hover:bg-black/30 dark:hover:bg-white/30 active:scale-95 transition-all duration-300"
                        
                        onClick={handlePay}>Confirm</button>
                    </div>
                </div>
            </div>,document.body)}
        </>
    )
}