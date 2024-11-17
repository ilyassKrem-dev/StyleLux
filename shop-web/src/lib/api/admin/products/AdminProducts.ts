




import Servers from "../../servers/Servers"
import Cookies from "js-cookie"
import axios, { AxiosError } from "axios"
import Admin from "../Admin"
import { MediaType } from "../../../utils/types/productTypes"

export type UpdateAddProductType = {
    name:string,
    category:string,
    price:number,
    quantity:number,
    gender:"m"|"f"|"",
    medias:MediaType[]
}


const baseUrl = Servers.springUrl
class AdminProducts extends Admin {
    
   static async getAllProdcuts(page:number) {
        let data = {
            success:true,
            data:{
                products:[],
                pages:0,
                max:0
            },
            error:""
        }
        try {
            const res = await axios.get(`${baseUrl}/admin/products`,{
                headers:{
                    Authorization:`Bearer ${Cookies.get("authToken")}`
                },
                params:{
                    page:page ? page-1 : 0
                }
            })
            if(res.data) {
                data.data.products = res.data.products
                data.data.pages = res.data.pages
                data.data.max = res.data.maxElements
                return data
            }
        } catch (error) {
            data.success = false
            data.error = "Something happened!"
            return data
        }
   }
   static async getProductSales(id:string) {
    let data:{
        success:boolean,
        data:{
            month:string,
            year:string,
            sales:number,
            quantity:number
        }[],
        error:string
    } = {
        success:true,
        data:[],
        error:""
    }
    try {
        const res = await axios.get(`${baseUrl}/admin/products/${id}/sales`,{
            headers:{
                Authorization:`Bearer ${Cookies.get("authToken")}`
            }
        })
        if(res.data) {
            data.data = res.data
            return data
        }
    } catch (error:any) {
        if(axios.isAxiosError(error)) {
            const axionError:AxiosError = error
            if(axionError.status == 404){
                data.success = false
                data.error = "404"
                return data
            } else{
                data.success = false
                data.error = "Something happened!"
                return data
            }
        }
        data.success = false
        data.error = "Something happened!"
        return data
    }
   }

   static async getRecentOrders(id:string,page:number=0,all:string="") {
    let data:{
        success:boolean,
        data:{
            id:number;
            total:number;
            date:string;
            status:"pending"|"completed"|"refunded"|"shipping";
            clientName:string
        }[],
        error:string
    } = {
        success:true,
        data:[],
        error:""
    }
    try {
        const params:Record<string,string> = {}
        params.page = page.toString();
        params.all = all
        const res = await axios.get(`${baseUrl}/admin/products/${id}/orders`,{
            headers:{
                Authorization:`Bearer ${Cookies.get("authToken")}`
            },
            params
        })
        if(res.data) {
            data.data = res.data
            return data
        }
    } catch (error:any) {
        if(axios.isAxiosError(error)) {
            const axionError:AxiosError = error
            if(axionError.status == 404){
                data.success = false
                data.error = "404"
                return data
            } else{
                data.success = false
                data.error = "Something happened!"
                return data
            }
        }
        data.success = false
        data.error = "Something happened!"
        return data
    }
   }

   static async updateProduct(id:String,productData:UpdateAddProductType) {

    let data = {
        success:true,
        error:""
    }

    try {
        const res = await axios.put(`${baseUrl}/admin/products/${id}/edit`,productData,{
            headers:{
                Authorization:`Bearer ${Cookies.get("authToken")}`
            }
        }) 
        if(res.data) {
            return data
        }
    } catch (error) {
        data.success = false
        if(axios.isAxiosError(error)) {
            const axiosError:AxiosError = error
            if(axiosError.status === 404) {
                data.error = "Product not found!"
                return data
            }
            if(axiosError.status == 406) { 
                data.error = "Somthing is wrong in form"
                return data
            }
            data.error = "Something happened"
            return data
        }
        data.error = "Something happened"
        return data
    }
   }

   static async addProduct(productData:UpdateAddProductType) {

    let data = {
        success:true,
        error:""
    }

    try {
        const res = await axios.post(`${baseUrl}/admin/products/add`,productData,{
            headers:{
                Authorization:`Bearer ${Cookies.get("authToken")}`
            }
        }) 
        if(res.data) {
            return data
        }
    } catch (error) {
        data.success = false
        if(axios.isAxiosError(error)) {
            const axiosError:AxiosError = error
            if(axiosError.status === 404) {
                data.error = "Product not found!"
                return data
            }
            if(axiosError.status == 406) { 
                data.error = "Somthing is wrong in form"
                return data
            }
            data.error = "Something happened"
            return data
        }
        data.error = "Something happened"
        return data
    }
   }
}


export default AdminProducts