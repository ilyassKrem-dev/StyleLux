import { CardElement, CardNumberElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { Deliverytype, PaymentType } from "../../../../../lib/utils/types/cartType";
import { useState } from "react";
import ReactDOM from "react-dom";
import { RxCross2 } from "react-icons/rx";
import { useCartItems } from "../../../../../lib/utils/hooks/hooks";
import Cart from "../../../../../lib/api/product/cart/Cart";
import { StripeCardNumberElement } from "@stripe/stripe-js";


interface Props{
    email:string;
    errors:{
        cardNumber:"",cardCvc:"",cardExpiry:""
    },
    deliveryInfo:Deliverytype;
    paymentInfo:PaymentType;
    userId:number
}

export default function PayBtn(
    {
    email, 
    errors, 
    deliveryInfo,
    paymentInfo,
    userId
}:Props){
    const [items] = useCartItems()
    const elements = useElements()
    const stripe = useStripe()
    const [show,setShow] = useState<boolean>(false)
    const [loading,setLoading] = useState<boolean>(false)
    const [errorMsg,setErrorMsg] = useState<string>("")
    
    const handlePay = async() => {
        if(loading || !stripe ||!elements) return
        setLoading(true)
        const cardElemnt = elements.getElement(CardNumberElement) as StripeCardNumberElement
        
        try {
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
                        region:deliveryInfo.country
                    },
                    amount:items.reduce((t,item) => t+(item.product.price * item.quantity),0),
                    items:items.map(item => ({
                        productId:item.product.id,
                        quantity:item.quantity})),
                    paymentId:paymentMethod.id
                }
            )
            if(res?.success) {
                const paymentId = res.data.paymentId
                const result = await stripe.confirmCardPayment(paymentId,{
                    payment_method:paymentMethod.id
                })
                if(result.error) {
                    setLoading(false)
                    
                }
                setLoading(false)
                setShow(false)
            } else {
                setLoading(false)
            }
        } catch (error) {
            setLoading(false)
            
        }
    }   
    return (
        <>
            <button className="w-full py-3 text-base font-bold bg-black rounded-md dark:bg-white dark:text-black text-white hover:bg-black/30 dark:hover:bg-white/30 active:scale-95 transition-all duration-300" onClick={() => setShow(true)}>
                Pay Now</button>
            {show&&ReactDOM.createPortal(
            <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center* items-center z-50 bg-black/30 dark:bg-white/30" onClick={() => setShow(false)}>
                <div className=" bg-white rounded-md w-[300px] h-fit md:w-[500px] mx-auto dark:bg-dark" onClick={(e) => e.stopPropagation()}> 
                    <div className="relative flex justify-center items-center p-3 border-b border-black/40 py-2 dark:border-white/40">
                        <h1 className="text-xl font-bold dark:text-white">Confirm</h1>
                        <div className="absolute right-2 rounded-full p-1 text-xl active:scale-95 border-2 hover:bg-black/30 dark:hover:bg-white/30 cursor-pointer transition-all duration-300 dark:text-white" onClick={() => setShow(false)}>
                            <RxCross2 />
                        </div>
                    </div>
                    {!loading&&
                    <div>
                        <p className="p-6 font-medium text-lg dark:text-white">Confirm payment ?</p>
                    </div>}
                    {loading&&
                    <div>
                        <p className="p-6 font-medium text-lg dark:text-white">Processing... ?</p>
                    </div>}
                    {errorMsg && (
                        <p className="text-red-500 text-center">{errorMsg}</p>
                    )}
                    <div className="flex justify-end items-center gap-5 px-3 border-t border-black/40 py-2 dark:border-white/40">
                        <button className="text-accent dark:text-accent/50 underline font-semibold active:scale-95 hover-opacity" onClick={() => setShow(false)}>Cancel</button>
                        <button className="p-2 text-base font-bold bg-black rounded-md dark:bg-white dark:text-black text-white hover:bg-black/30 dark:hover:bg-white/30 active:scale-95 transition-all duration-300"
                        disabled={loading}
                         onClick={handlePay}>Confirm</button>
                    </div>
                </div>
            </div>,document.body)}
        </>
    )
}