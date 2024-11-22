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
    maxQuantity:number;
    discount:number
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




export type CheckoutErrorsCheck = {
    email:boolean
    delivery:{
        country:boolean,
        firstname:boolean,
        lastname:boolean,
        city:boolean,
        postalcode:boolean,
        address:boolean
    };
    payment:{
        cardNumber:boolean;
        cardCvc:boolean;
        cardExpiry:boolean;
    }
}