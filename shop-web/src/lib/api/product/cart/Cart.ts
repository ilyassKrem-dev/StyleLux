
import axios from "axios";
import Servers from "../../servers/Servers";
import { CartItemsType,CartItem } from "../../../utils/types/cartType";


const baseUrl = Servers.springUrl

type ItemsType = {
    uid:string;
    quantity:number;
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
}


export default Cart