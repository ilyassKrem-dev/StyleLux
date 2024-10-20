import { SetStateAction } from "react";
import { PaymentType } from "../../../../../lib/utils/types/cartType"
import { CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js";


export default function PaymentInfo({paymentInfo,setPaymentInfo,errors,setErrors}:{
    paymentInfo:PaymentType;
    setPaymentInfo:React.Dispatch<SetStateAction<PaymentType>>;
    errors:{
        cardNumber:"",cardCvc:"",cardExpiry:""
    },
    setErrors:React.Dispatch<SetStateAction<{
        cardNumber:"",cardCvc:"",cardExpiry:""
    }>>
}) {
    const {type,save} = paymentInfo
    const isDark = localStorage.getItem("darkMode") ? true : false
    
    const handleCardChange = (e:any) => {
        if (!e.complete) {
            if(e.error) {
                if(e.elementType == "cardExpiry") {
                    e.error.message = "Invalid date"
                }
                setErrors((prev) => ({...prev,[e.elementType]:e.error.message}))
            }
        }
        if(e.complete) {
            setErrors({
                cardNumber:"",
                cardCvc:"",
                cardExpiry:""
            })
        }
        setPaymentInfo(prev => ({...prev,type:e.brand == "visa" ? "Visa" : "MasterCard"}))
    }
    return (
        <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center dark:text-white">
                <h3 className="text-2xl font-semibold">Payment</h3>
            </div>
            <div className="flex flex-col gap-3 bg-lighter dark:bg-darker !max-w-[300px] sm:!max-w-full max-[340px]:!max-w-[280px]">
                <div className="p-3 border-2 bg-white border-[#8A8A8A] flex justify-between items-center dark:bg-dark ">
                    <p className="font-semibold dark:text-white">Credit Card</p>
                    <div className="relative">
                        <div className="w-[40px] h-[40px]">
                            <img src={`/cards/${type==="Visa"?"visa.svg":"mastercard.svg"}`} alt="" className={`${type=="Visa" ?" align-top" :"w-full h-full bg-blue-900 px-1 rounded-md "}`} />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col p-2 pt-0 dark:text-white">

                    <div className="flex flex-col p-2 pt-1">
                        <CardNumberElement
                        options={{
                            placeholder:"Card Number",
                            style:{
                                base:{
                                    color: isDark ? 'white' : 'black'
                                    
                                }
                            }
                        }}
                        className="custom-input border-2 !p-3 border-[#8A8A8A] !border-b-2  !max-w-[300px] sm:!max-w-full"
                        onChange={handleCardChange} />
                        {errors.cardNumber&&<p className="h-[10px] text-accent text-sm font-semibold">{errors.cardNumber}</p>}
                    </div>
                    <div className="flex gap-2 items-center !max-w-[300px] sm:!max-w-full ">

                        <div className="flex flex-col p-2 pt-1 w-full">
                            <CardExpiryElement
                            options={{
                                placeholder:"Expiration Date",
                                style:{
                                    base:{
                                        color: isDark ? 'white' : 'black'
                                        
                                    }
                                }
                            }}
                            className="custom-input border-2 !p-3 border-[#8A8A8A] !border-b-2 "
                            onChange={handleCardChange} />
                            <p className="h-[10px] text-accent text-sm font-semibold">{errors.cardExpiry}</p>
                        </div>

                        <div className="flex flex-col p-2 pt-1 w-full">
                            <CardCvcElement
                            options={{
                                placeholder:"Expiration Date",
                                style:{
                                    base:{
                                        color: isDark ? 'white' : 'black'
                                        
                                    }
                                }
                            }}
                            className="custom-input border-2 !p-3 border-[#8A8A8A] !border-b-2"
                            onChange={handleCardChange} />
                            <p className="h-[10px] text-accent text-sm font-semibold">{errors.cardCvc}</p>
                        </div>
                    </div>

                    <div className="flex items-center px-3 gap-2 pt-2">
                        <input 
                        type="checkbox" 
                        name="save" 
                        id="save" 
                        className="scale-150 accent-black dark:accent-white"
                        checked={save}
                        onChange={(e) => setPaymentInfo(prev => ({...prev,save:e.target.checked}))} />
                        <label htmlFor="save" className="text-sm text-[#8A8A8A] dark:text-white">Save this info for future</label>
                    </div>
                </div>
            </div>
        </div>
    )
}