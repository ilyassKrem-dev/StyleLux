
import { SetStateAction, useState } from "react"
import { CheckoutErrorsCheck, Deliverytype } from "../../../../lib/utils/types/cartType"
import DeliveryInfo from "./delivery/deliveryInfo"
import React from "react"
import PaymentInfo from "./payment/paymentInfo"
import PayBtn from "./payment/paybtn"
import EmailInfo from "./email/emailInfo"
import { sessionType } from "../../../../lib/utils/types/authTypes"

const DeliveryInfoMemo = React.memo(DeliveryInfo)
const PaymentInfoMemo = React.memo(PaymentInfo)
const EmailInfoMemo = React.memo(EmailInfo)
export default function CheckoutInfo({session,setCompleted}:{
    session:sessionType;
    setCompleted:React.Dispatch<SetStateAction<boolean>>
}) {
    const [email,setEmail] = useState<string>(session.email ?? "")

    const [errorsCheck,setErrorsCheck] = useState<CheckoutErrorsCheck>({
       email:false,
       delivery:{
        country:false,
        postalcode:false,
        city:false,
        address:false,
        firstname:false,
        lastname:false
       },
       payment:{
            cardNumber:true,
            cardCvc:true,
            cardExpiry:true
       }
    })
    const [deliveryInfo,setDeliveryInfo] = useState<Deliverytype>({
        country:null,
        firstname:session.firstname ?? "",
        lastname:session.lastname??"",
        address:"",
        city:"",
        postalcode:"",
        save:false
    })

    return (
        <div className="flex-1 p-2 md:border-r-2">
            <div className="flex flex-col gap-4 py-10">
                <EmailInfoMemo 
                email={email}
                setEmail={setEmail}
                setErrorsCheck={setErrorsCheck}/>
                
                <DeliveryInfoMemo 
                deliveryInfo={deliveryInfo} 
                setDeliveryInfo={setDeliveryInfo}
                errorsCheck={errorsCheck}
                setErrorsCheck={setErrorsCheck}/>

                <PaymentInfoMemo 
                setErrorsCheck={setErrorsCheck}
                />

                <PayBtn 
                email={email} 
                errorsCheck={errorsCheck} 
                deliveryInfo={deliveryInfo}
                setErrorsCheck={setErrorsCheck}
                userId={session.id}
                setCompleted={setCompleted}/>
            </div>
        </div>
        
    )
}