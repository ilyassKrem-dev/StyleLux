import Admin from "../Admin";
import Servers from "../../servers/Servers";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";

const baseUrl = Servers.springUrl


type DataDealType = {
    productIds:number[],
    name:string,
    discount:number,
    startDate:string,
    endDate:string
}
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

    static async AddDeal(dealDate:DataDealType) {
        let data = {
            success:true,
            error:""
        }

        try {
            const res =await axios.post(`${baseUrl}/admin/deals/add`,dealDate,{
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
                    data.error = error.response?.data as string ?? ""
                    return data
                }
                else {
                    data.error = "Couldn't add the deal"
                    return data
                }
            }
            data.error = "Couldn't add the deal"
            return data
        }
    }
    static async updateDeal(dealDate:DataDealType,id:string) {
        let data = {
            success:true,
            error:""
        }

        try {
            const res =await axios.put(`${baseUrl}/admin/deals/${id}/edit`,dealDate,{
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
                    data.error = error.response?.data as string ?? ""
                    return data
                }
                else {
                    data.error = "Couldn't add the deal"
                    return data
                }
            }
            data.error = "Couldn't add the deal"
            return data
        }
    }
    static async getDeal(id:string) {
        let data = {
            success:true,
            data:undefined,
            error:""
        }

        try {
            const res =await axios.get(`${baseUrl}/admin/deals/${id}`,{
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
            if(axios.isAxiosError(error)) {
                const axiosError:AxiosError = error
                if(axiosError.status === 404) {
                    data.error = "No deal with this id exists"
                    return data
                }
                else {
                    data.error = "Something happened!!"
                    return data
                }
            }
            data.error = "Something happened!!"
            return data
        }
    }
}


export default AdminDeals