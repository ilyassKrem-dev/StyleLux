
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
    items:{
        productId:number,
        quantity:number
    }[]
    fullAddress:{
        address:string,
        city:string,
        region:string | null,
        postalCode:string
    },
    paymentId:string
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
                paymentId:""
            },
            error:""
        }
        try {
            const res = await axios.post(`${baseUrl}/checkout/create`,info,{
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

}


export default Cart