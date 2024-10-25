
import axios from "axios";
import Servers from "../servers/Servers"
import Cookies from "js-cookie";

const baseUrl = Servers.springUrl
class User {
    private uid:string;

    constructor(uid:string) {
        this.uid = uid
    }

    async getUser() {
        let data = {
            success:true,
            data:undefined,
            error:""
        }

        try {
            const res =await axios.get(`${baseUrl}/users/${this.uid}`,{
                headers:{
                    Authorization:`Bearer ${Cookies.get("authToken")}`
                }
            }) 
            if(res.data) {
                data.data = res.data
                return data
            }
        } catch (error) {
            data.success = false;
            data.error = "Error getting your details!"
            return data
        }

    }
    async getUserOrders(page:string="0") {
        let data = {
            success:true,
            data:undefined,
            error:""
        }
        let params:Record<string,string> = {}
        params.page = page
        try {
            const res =await axios.get(`${baseUrl}/users/${this.uid}/orders`,{
                params,
                headers:{
                    Authorization:`Bearer ${Cookies.get("authToken")}`
                }
            }) 
            if(res.data) {
                data.data = res.data
                return data
            }
        } catch (error) {
            data.success = false;
            data.error = "Error getting your details!"
            return data
        }
    }
}


export default User