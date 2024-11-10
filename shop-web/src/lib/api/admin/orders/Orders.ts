
import Admin from "../Admin";
import Servers from "../../servers/Servers"
import Cookies from "js-cookie"
import axios, { AxiosError } from "axios"


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
    async getOrderDetails(id:string |undefined) {
        let data = {
            success:true,
            data:undefined,
            error:""
        }
        try {
            const res =await axios.get(`${baseUrl}/admin/orders/${id}`,{
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
            if(axios.isAxiosError(error)) {
                const axiosError:AxiosError = error;
                if(axiosError.status == 404) {
                    data.error ="Not found"
                    return data 
                } else {
                    data.error ="Something happened! "
                    return data 
                }
            }
            data.error ="Something happened! "
            return data 
          
        }
    }

    static async getSearchResults(params:string) {
        let data = {
            success:true,
            data:[],
            error:""
        }
        
        if(params.length === 0) {
            data.data = []
            return data
        }
        try {
            const res =await axios.get(`${baseUrl}/admin/orders/search`,{
                headers:{
                    Authorization:`Bearer ${Cookies.get("authToken")}`
                },
                params:{
                    value:params
                }
            })
            if(res.data) {
                data.data = res.data
                return data
            }
        } catch (error) {
            data.success = false
            if(axios.isAxiosError(error)) {
                const axiosError:AxiosError = error;
                if(axiosError.status == 404) {
                    data.error ="Not found"
                    return data 
                } else {
                    data.error ="Something happened! "
                    return data 
                }
            }
            data.error ="Something happened! "
            return data 
          
        }
    }
}


export default Orders;