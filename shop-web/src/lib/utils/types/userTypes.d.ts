import { CartItem } from "./cartType";


export type addressType = {
    address:string, 
    city:string, 
    region:string, 
    postalCode:string
}

export type userType = {
    addresses:addressType
    email:string;
    firstName:string;
    id:number;
    lastName:string;
    number:string;
}


export type userOrderType = {
    
    id: number,
    uid: string,
    product: CartItem[],
    total: number,
    placedAt: string,
    address: string,
    status:  "pending"|"completed"|"refunded"|"shipping"
    
}


export type clientOrderType = {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    number: string,
    addresses: addressType | null
}