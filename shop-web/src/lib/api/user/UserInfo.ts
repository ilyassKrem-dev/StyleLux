import User from "./User";

import axios, { AxiosError } from "axios";
import Servers from "../servers/Servers"
import Cookies from "js-cookie";

const baseUrl = Servers.springUrl

class UserInfo extends User {

    async updateFullName(fullname:{
        fname:string;
        lname:string
    }) {
        let data = {
            success:true,
            data:[],
            errors:{
                fname:"",
                lname:""
            }
        }
        try {
            const res =await axios.patch(`${baseUrl}/users/${this.uid}/name/update`,
            fullname,
            {
                headers:{
                    Authorization:`Bearer ${Cookies.get("authToken")}`
                }
            })
            if(res.data) {
                data.data = res.data
                return data
            }
        } catch (error:any) {
            data.success = false
            if(axios.isAxiosError(error)) {
                const axiosError:AxiosError = error
                if(axiosError.status === 404) {

                }
                if(axiosError.status === 400) {
                    const fnameError = (axiosError?.response?.data as any).fname ?? ""
                    const lnameError = (axiosError?.response?.data as any).lname ?? ""
                    data.errors.fname = fnameError
                    data.errors.lname = lnameError
                    return data
                }
                if(axiosError.status == 406) {
                    const fnameError = axiosError?.response?.data as string
                    data.errors.fname = fnameError
                    return data
                } else {

                    data.errors.fname = "Something happened,try again later!"
                    return data
                }
            }
            return data
        }
    }

    async updateNumber(number:string) {
        let data = {
            success:true,
            data:[],
            error:""
        }
        try {
            const res =await axios.patch(`${baseUrl}/users/${this.uid}/number/update`,
            {
                number
            },
            {
                headers:{
                    Authorization:`Bearer ${Cookies.get("authToken")}`
                }
            })
            if(res.data) {
                data.data = res.data
                return data
            }
        } catch (error:any) {
            data.success = false
            if(axios.isAxiosError(error)) {
                const axiosError:AxiosError = error
                if(axiosError.status === 400) {
                    const errorMsg = (axiosError?.response?.data as any).number ?? ""
                    data.error = errorMsg as string
                   
                    return data
                }
                if(axiosError.status == 406) {
                    const errorMsg = axiosError?.response?.data ?? ""
                    data.error = errorMsg as string
                    return data
                } else {

                    const errorMsg = axiosError?.response?.data ?? ""
                    data.error = errorMsg as string
                    return data
                }
            }
            return data
        }
    }

    async updateAddress(addressInfo:{
        address:string;
        city:string;
        country:string;
        postalCode:string
    }) {
        let data = {
            success:true,
            errors:{
                address:"",
                city:"",
                country:"",
                postalCode:""
            }
        }
        try {
            const res =await axios.patch(`${baseUrl}/users/${this.uid}/address/update`,
            addressInfo,
            {
                headers:{
                    Authorization:`Bearer ${Cookies.get("authToken")}`
                }
            })
            if(res.data) {
                return data
            }
        } catch (error:any) {
            data.success = false
            if(axios.isAxiosError(error)) {
                const axiosError:AxiosError = error
                if(axiosError.status === 404) {

                }
                if(axiosError.status === 400) {
                    const addressError = (axiosError?.response?.data as any).address ?? ""
                    const cityError = (axiosError?.response?.data as any).city ?? ""
                    const postalError = (axiosError?.response?.data as any).postalCode ?? ""

                    data.errors.address = addressError
                    data.errors.city = cityError
                    data.errors.postalCode=postalError
                    return data
                }
                if(axiosError.status == 406) {
                    const error = axiosError?.response?.data as string
                    data.errors.address = error
                    return data
                } else {

                    data.errors.address = "Something happened,try again later!"
                    return data
                }
            }
            return data
        }
    }
}


export default UserInfo