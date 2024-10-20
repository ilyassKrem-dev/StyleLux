import { Link } from "react-router-dom"
import { useSession } from "../../../../assets/shared/wrappers/SessionWrapper"
import { useState } from "react"
import { Deliverytype, PaymentType } from "../../../../lib/utils/types/cartType"
import DeliveryInfo from "./misc/deliveryInfo"
import React from "react"
import PaymentInfo from "./payment/paymentInfo"
import PayBtn from "./payment/paybtn"

const DeliveryInfoMemo = React.memo(DeliveryInfo)
const PaymentInfoMemo = React.memo(PaymentInfo)

export default function CheckoutInfo() {
    const {session} = useSession()
    
    const [email,setEmail] = useState<string>(session.email ?? "")
    const [errors,setErrors] = useState<{
        cardNumber:"",cardCvc:"",cardExpiry:""
    }>({
        cardNumber:"",cardCvc:"",cardExpiry:""
    })
    const [deliveryInfo,setDeliveryInfo] = useState<Deliverytype>({
        country:null,firstname:session.firstname ?? "",lastname:session.lastname??"",address:"",city:"",postalcode:"",save:false
    })
    const [paymentInfo,setPaymentInfo] = useState<PaymentType>({
        type:"MasterCard",save:false
    })
    
    
    return (
        <div className="flex-1 p-2 md:border-r-2">
            <div className="flex flex-col gap-4 py-10">
                <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-center dark:text-white">
                        <h3 className="md:text-2xl font-semibold text-lg">Contact</h3>
                        {!session.id&&<p className="text-sm font-semibold">
                            Have an account?{" "}  
                            <Link to={"/auth/signup"} className="text-blue-400 underline active:scale-95 cursor-pointer">Create Account</Link >
                        </p>}
                    </div>
                    <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Email Address" 
                    className=" border-2 border-[#8A8A8A] !w-[300px] sm:!w-full max-[340px]:!max-w-[280px]"/>
                </div>
                <DeliveryInfoMemo 
                deliveryInfo={deliveryInfo} 
                setDeliveryInfo={setDeliveryInfo}/>
                <PaymentInfoMemo 
                paymentInfo={paymentInfo} 
                setPaymentInfo={setPaymentInfo}
                errors={errors}
                setErrors={setErrors}/>

                <PayBtn 
                email={email} 
                errors={errors} 
                deliveryInfo={deliveryInfo}
                paymentInfo={paymentInfo}
                userId={session.id}/>
            </div>
        </div>
        
    )
}