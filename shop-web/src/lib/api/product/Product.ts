
import axios from "axios";
import Servers from "../servers/Servers"


const baseUrl = Servers.springUrl

class Product {

    static async getAllProduct() {
        let data = {
            success:true,
            data:[],
            error:""
        }

        try {
            const res = await axios.get(`${baseUrl}/products`)
           
            if(res.data) {
                data.data = res.data
                return data
            }
        } catch (error:any) {
            
            data.success = false;
            data.error = "Internal server error,try again later"
            return data
        }
        
    }
}


export default Product