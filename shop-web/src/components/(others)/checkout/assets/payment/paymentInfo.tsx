import { SetStateAction, useState } from "react";
import { CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js";
import { CheckoutErrorsCheck } from "../../../../../lib/utils/types/cartType";
import { FaRegCreditCard } from "react-icons/fa";

type cardErrorsType = {
    cardNumber:string,cardCvc:string,cardExpiry:string
}

export default function PaymentInfo({setErrorsCheck}:{
    setErrorsCheck:React.Dispatch<SetStateAction<CheckoutErrorsCheck>>
}) {
    const [errors,setErrors] = useState<cardErrorsType>({
        cardNumber:"",cardCvc:"",cardExpiry:""
    })

    const isDark = localStorage.getItem("darkMode") ? true : false
    
    const handleCardChange = (e:any) => {
        
        if (!e.complete) {
            if(e.error) {
                setErrorsCheck(prev => ({...prev,
                    payment:{...prev.payment,
                    [e.elementType]:true}}))
                if(e.elementType == "cardExpiry") e.error.message = "card is expired"
                
                setErrors((prev) => ({...prev,[e.elementType]:e.error.message}))
            }
        }
        if(e.complete) {
            setErrors(prev => ({...prev,[e.elementType]:""}))
            setErrorsCheck(prev => ({...prev,
                payment:{...prev.payment,
                [e.elementType]:false}}))
        } 
    }
        
    
    return (
        <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center dark:text-white">
                <h3 className="text-2xl font-semibold">Payment</h3>
            </div>
            <div className="flex flex-col gap-3 bg-lighter dark:bg-darker !max-w-[300px] sm:!max-w-full max-[340px]:!max-w-[280px]">
                <div className="p-3 border-2 bg-white border-[#8A8A8A] flex justify-between items-center dark:bg-dark ">
                    <p className="font-semibold dark:text-white">Credit Card</p>
                    <div className="text-2xl dark:text-white">
                        <FaRegCreditCard />
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
                </div>
            </div>
        </div>
    )
}