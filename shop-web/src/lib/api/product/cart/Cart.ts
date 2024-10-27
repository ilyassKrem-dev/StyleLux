
import axios from "axios";
import Servers from "../../servers/Servers";
import { CartItemsType,CartItem } from "../../../utils/types/cartType";
import Cookies from "js-cookie";

const baseUrl = Servers.springUrl

type ItemsType = {
    uid:string;
    quantity:number;
}

type CheckOutType = {
    email:string;
    fullname:string;
    amount:number;
    userId:number;
    fullAddress:{
        address:string,
        city:string,
        region:string | null,
        postalCode:string,
        save:boolean
    },
    paymentId:string
}
type orderType = {
    items:{
        productId:number,
        quantity:number
    }[];
    amount:number;
    userId:number;
    paymentId:string;
    location:{
        address:string,
        city:string,
        region:string | null,
        postalCode:string,
        save:boolean
    }

}
class Cart {

    static async getCartProducts(items:ItemsType[]) {
        let data = {
            success:true,
            data:[] as CartItemsType[],
            error:""
        }
        try {
            const changedItems = items.map(item => item.uid)
            
            const res = await axios.post(`${baseUrl}/products/cart`,changedItems)
          
            if(res.data) {
                const responseData = res.data as CartItem[]
                const returnedRes= responseData.map((cart:CartItem) => {
                    const findItems = items.find(item => item.uid === cart.uid)
                    if(findItems) {
                        return {
                            product:cart,
                            quantity:Math.min(findItems.quantity,cart.maxQuantity),
                            maxQuantity:cart.maxQuantity
                        }
                    }
                }) as CartItemsType[]
                data.data = returnedRes
                return data
            }
        } catch (error:any) {
            data.success = false;
            data.error = "Failed to get Items in Cart,try again later"
            return data
        }
    }
    static async createCheckout(info:CheckOutType) {
        let data = {
            success:true,
            data:{
                customerId:"",
                paymentId:"",
                clientId:""
            },
            error:""
        }
        try {
            const res = await axios.post(`${baseUrl}/checkout/create_payment`,info,{
                headers:{
                    "Authorization": `Bearer ${Cookies.get("authToken")}`
                }
            })
            
            if(res.data) {
                data.data = res.data
                return data
            }
        } catch (error:any) {
            data.success = false;
            data.error = "Interal server error"
            return data
        }
    }
    static async createOrder(info:orderType) {
        let data = {
            success:true,
            error:""
        }
        try {
            const res = await axios.post(`${baseUrl}/checkout/create_order`,info,{
                headers:{
                    "Authorization": `Bearer ${Cookies.get("authToken")}`
                }
            })
            
            if(res.data) {
            
                return data
            }
        } catch (error:any) {
            data.success = false;
            data.error = "Interal server error"
            return data
        }

    }
    static async refundOrder(orderId:number) {
        let data = {
            success:true,
            data:{
                amount:0,
                status:"",
                currency:"",
                id:""
            },
            error:''
        }

        try {
            const res = await axios.post(`${baseUrl}/orders/${orderId}/refund`,undefined,{
                headers:{
                    Authorization:`Bearer ${Cookies.get("authToken")}`
                }
            })
            if(res.data) {
                data.data = res.data
                return data
            }
        } catch (error:any) {
            data.success = false
            data.error = "Error refunding the order,try again later.."
            return data
        }
    }
}


export default Cart