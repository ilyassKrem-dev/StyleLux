
import axios from "axios";
import Servers from "../servers/Servers"
import Cookies from "js-cookie";

const baseUrl = Servers.springUrl


class Deal {

    static async getDealsHome() {
        let data = {
            success:true,
            data:[],
            error:""
        }
        try {
                const res =await axios.get(`${baseUrl}/deals/home`)
                if(res.data) {
                    data.data = res.data
                    return data
                }
        } catch (error) {
            data.success=false
            data.error="Somthing happened!!,try again later"
            return data
        }
    }
}

export default Deal