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