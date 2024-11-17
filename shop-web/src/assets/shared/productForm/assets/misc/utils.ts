import { SetStateAction } from "react";
import { UpdateAddProductType } from "../../../../../lib/api/admin/products/AdminProducts";
import { ErrorsType } from "./types/productInfo";





export const handleErrors = (data:UpdateAddProductType,setErrors:React.Dispatch<SetStateAction<ErrorsType>>) => {
    const {name,price,quantity,gender}  = data
    let error = false
    if(name.length==0) setErrors(prev => ({...prev,name:"Name must be more than 3 character"}))

    if(price == 0) setErrors(prev => ({...prev,price:"Price must be more than 0"})) 
    if(quantity == 0) setErrors(prev => ({...prev,price:"Quantity must be more than 0"}))  

    if(!gender) setErrors(prev => ({...prev,gender:"Gender is required"}))
    if(name.length==0 || price == 0 || quantity == 0 || !gender) error = true
    return error
}