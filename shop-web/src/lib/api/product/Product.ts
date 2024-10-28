
import axios from "axios";
import Servers from "../servers/Servers"
import Cookies from "js-cookie";

const baseUrl = Servers.springUrl

type ParamsType = {
    sizeParams:string|null;
    categoryParams:string|null;
    pageParams:string|null;
    genderParam:string|null
}
class Product {

    static async getAllProduct({
        sizeParams,
        categoryParams,
        pageParams,
        genderParam}:ParamsType) {
        let data = {
            success:true,
            data:{
                products:[],
                pages:0
            },
            error:""
        }
        const params:Record<string,string> = {}
        
        if(sizeParams) params.sizes = sizeParams
        if(categoryParams) params.category = categoryParams
        if(genderParam) params.gender = genderParam
        if(pageParams) params.page = (Number(pageParams) - 1).toString()
        try {
            const res = await axios.get(`${baseUrl}/products`,{params})
           
            if(res.data) {
                data.data.products = res.data.products
                data.data.pages = res.data.pages
                return data
            }
        } catch (error:any) {
            
            data.success = false;
            data.error = "Internal server error,try again later"
            return data
        }
        
    }

    static async getProduct(id:string) {
        let data = {
            success:true,
            data:undefined,
            error:""
        }
        try {
            const res = await axios.get(`${baseUrl}/products/${id}`,{
                headers:{
                    "Authorization":`Bearer ${Cookies.get("authToken") ?? ""}`
                }
            })
           
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