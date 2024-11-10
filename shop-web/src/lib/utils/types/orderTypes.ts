import { ProductType } from "./productTypes"
import { clientOrderType } from "./userTypes"



export type OrderByIdType = {
    id: number,
    uid: string,
    total: number,
    status: "refunded" | "shipping" |"completed" |"pending",
    client: clientOrderType,
    products:ProductType[],
    address: string,
    city: string,
    country: string,
    postalCode: string,
    createdAt: string,
    updatedAt: string
}