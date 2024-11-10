import axios from "axios";
import Servers from "../../servers/Servers";
import Admin from "../Admin";
import Cookies from "js-cookie";


const baseUrl = Servers.springUrl


class AdminUsers extends Admin {


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


export default AdminUsers