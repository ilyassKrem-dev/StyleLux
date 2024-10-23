

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