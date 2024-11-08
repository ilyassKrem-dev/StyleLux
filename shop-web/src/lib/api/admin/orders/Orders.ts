
import Admin from "../Admin";
import Servers from "../../servers/Servers"
import Cookies from "js-cookie"
import axios from "axios"


const baseUrl = Servers.springUrl

class Orders extends Admin {
    async getAllOrders() {
        let data = {
            success:true,
            data:[],
            error:""
        }
        try {
            const res =await axios.get(`${baseUrl}/admin/orders`,{
                headers:{
                    Authorization:`Bearer ${Cookies.get("authToken")}`
                }
            })
            if(res.data) {
                data.data = res.data
                return data
            }
        } catch (error) {
           data.success = false
           data.error ="Something happened! "
           return data 
        }
    }
    static async getSimpleUser(id:number) {
        let data = {
            success:true,
            data:undefined,
            error:""
        }
        try {
            const res =await axios.get(`${baseUrl}/admin/users/${id}/simple`,{
                headers:{
                    Authorization:`Bearer ${Cookies.get("authToken")}`
                }
            })
            if(res.data) {
                data.data = res.data
                return data
            }
        } catch (error) {

           data.success = false
           data.error ="Something happened! "
           return data 
        }
    }
}


export default Orders;