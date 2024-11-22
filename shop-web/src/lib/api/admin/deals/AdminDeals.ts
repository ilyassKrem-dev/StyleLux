import Admin from "../Admin";
import Servers from "../../servers/Servers";
import axios from "axios";
import Cookies from "js-cookie";

const baseUrl = Servers.springUrl

class AdminDeals extends Admin  {


    static async getAllDeals(page:string="0") {
        let data = {
            success:true,
            data:{
                deals:[],
                pages:0,
                maxElements:0
            },
            error:""
        }

        try {
            const res =await axios.get(`${baseUrl}/admin/deals/`,{
                headers:{
                    Authorization:`Bearer ${Cookies.get("authToken")}`
                },
                params:{
                    page:Number(page) - 1
                }
            })
            if(res.data) {
                data.data = res.data
                return data
            }
        } catch (error) {
                data.success = false
                data.error = "Couldn't get the data"
                return data
        }
    }
}


export default AdminDeals