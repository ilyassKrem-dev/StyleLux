import { SetStateAction } from "react";
import { CheckoutErrorsCheck, Deliverytype } from "../../../../../lib/utils/types/cartType"

type errorDataType = {
    delivery:Deliverytype
    errorsCheck:CheckoutErrorsCheck
    setErrorsCheck:React.Dispatch<SetStateAction<CheckoutErrorsCheck>>
}


export const ValidatePayInfo =(errorsData:errorDataType)  => {
    const {delivery,errorsCheck,setErrorsCheck} = errorsData
    if(errorsCheck.payment.cardCvc || errorsCheck.payment.cardNumber || errorsCheck.payment.cardExpiry) {
        return true
    }

    return validateDelivery(delivery,setErrorsCheck) || errorsCheck.email

}


const validateDelivery = (
    data:Deliverytype,
    setErrorsCheck:React.Dispatch<SetStateAction<CheckoutErrorsCheck>>) => {
        setErrorsCheck(prev => ({...prev,delivery:{
            country: (data.country as string).trim().length>0 ? false : true,
            address: data.address.trim().length>0 ? false : true,
            city: data.city.trim().length>0 ? false : true,
            postalcode: data.postalcode.trim().length>0 ? false : true,
            firstname: data.firstname.trim().length>0 ? false : true,
            lastname: data.lastname.trim().length>0 ? false : true
        }}))

     return Object.values(data).every(field => {
        
        return (field?.toString() as string).length>0}) ? false : true;
}


export const isError = (delivery:Deliverytype,errorsCheck:CheckoutErrorsCheck) =>  {
    const checkDelivery = Object.values(delivery).every(field => {
        return field?.toString() as string}) ? false : true;

    if(errorsCheck.payment.cardCvc || errorsCheck.payment.cardNumber || errorsCheck.payment.cardExpiry) {
        return true
    }
    return checkDelivery || errorsCheck.email
}