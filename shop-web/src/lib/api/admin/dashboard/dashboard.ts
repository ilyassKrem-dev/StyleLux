
import Servers from "../../servers/Servers"
import Cookies from "js-cookie"
import axios from "axios"
import Admin from "../Admin"


const baseUrl = Servers.springUrl
class DashBoard extends Admin {
    
    async getSummery() {
        let data ={
            success:true,
            data:undefined,
            error:""
        }
        try {
            const res = await axios.get(`${baseUrl}/admin/dashboard/summery`,{
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
            data.error = "Something happened!"
            return data
        }
    }
    async getGraphSummery() {
        let data ={
            success:true,
            data:undefined,
            error:""
        }
        try {
            const res = await axios.get(`${baseUrl}/admin/dashboard/graph`,{
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
            data.error = "Something happened!"
            return data
        }
    }
    async getTopProducts() {
        let data ={
            success:true,
            data:[],
            error:""
        }
        try {
            const res = await axios.get(`${baseUrl}/admin/dashboard/top`,{
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
            data.error = "Something happened!"
            return data
        }
    }
}


export default DashBoard