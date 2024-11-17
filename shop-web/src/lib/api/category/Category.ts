
import axios from "axios"
import Servers from "../servers/Servers"
import { CategoryType } from "../../utils/types/categoryTypes"

const baseUrl = Servers.springUrl

class Category {
    

    static async getAllCategories() {
        let data = {
            success:true,
            data:[] as CategoryType[],
            error:""
        }
        try {
            const res = await axios.get(`${baseUrl}/categories`)
            if(res.data) {
                data.data = res.data
                return data
            }
        } catch (error:any) {
            data.success = false
            data.error = "Couldn't fetch categories!!"
            return data
        }

    }
}


export default Category