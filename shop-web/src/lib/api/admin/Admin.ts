

import Servers from "../servers/Servers"
import axios from "axios"
import Cookies from "js-cookie";

const baseUrl = Servers.springUrl

class Admin {
    private uid:string;

    constructor(uid:string) {
        this.uid = uid
    }

    async isAdmin() {
        let data = {
            success:true,
            error:''
        }
        try {
            const res = await axios.get(`${baseUrl}/admin/${this.uid}/isadmin`,{
                headers:{
                    Authorization:`Bearer ${Cookies.get("authToken")}`
                }
            }) 
            if(res.data) {
                return data
            }
        } catch (error) {

            data.success = false
            data.error = "Unauthorized"
            return data
        }
    }
 }

export default Admin