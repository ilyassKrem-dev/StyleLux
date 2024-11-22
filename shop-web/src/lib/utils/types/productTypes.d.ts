



export type ProductType = {
    id:number;
    gender:"m"|"f";
    category:{
        uid:string;
        name:string;
    }
    media:MediaType
    name:string;
    price:number;
    sizes:string[];
    uid:string;
    quantity:number;
    sold:number;
    discount:number
}

export type MediaType = {
    id:number|null;
    uid:string;
    type:"image"|"video"|null;
    url:string|null;
    isDefault:boolean;
    file?:File;
}

export type SingleProductType = {
    id:number;
    gender:"m"|"f";
    category:{
        uid:string;
        name:string;
    }
    media:MediaType[]
    name:string;
    price:number;
    sizes:string[];
    uid:string;
    quantity:number;
    rating:number;
    numRating:number;
    sold:number;
    discount:number;
    isFavorite:boolean

}


