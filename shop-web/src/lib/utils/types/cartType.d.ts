import { MediaType } from "./productTypes";


export type CartItemsType = {
    product:CartItem;
    quantity:number;
    maxQuantity:number
}

export type CartItem = {
    id:number;
    uid:string;
    name:string;
    media:MediaType;
    sizes:string[];
    price:number;
    maxQuantity:number
}


export type Deliverytype = {
    country:string|null;
    firstname:string;
    lastname:string;
    address:string;
    city:string;
    postalcode:string;
    save:boolean
}


export type PaymentType = {
    type:"Visa"|"MasterCard";
    save:boolean
}