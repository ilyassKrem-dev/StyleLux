import { ProductType } from "./productTypes"





export type DealType = {
    id:number,
    name:string,
    status:string,
    startDate:string,
    endDate:string
}


export type DealDetailsType = {
    products:ProductType[];
    id:number;
    name:string;
    discount:number;
    startDate:string;
    endDate:string;
    status:string
}