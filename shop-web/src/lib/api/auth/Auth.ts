import axios, { AxiosError } from "axios"
import Servers from "../servers/Servers"
import Cookies from 'js-cookie';
import { loginType, signUpType } from "../../utils/types/authTypes"

const url = Servers.springUrl
class Auth {
    

    static async signUp(info:signUpType) {
        
        let data = {
            success:true,
            data:undefined,
            errors:{
                firstname:"",
                lastname:"",
                email:"",
                number:"",
                passowrd:"",
                con_password:""
            }
        }
        try {
          
            const res = await axios.post(`${url}/auth/signup`,info)
            if(res.data) {
                const token = res.data.token
                const neededData = {
                    id:res.data.id,
                    firstname:res.data.firstname,
                    lastname:res.data.lastname,
                    email:res.data.email,
                    role:res.data.role,
                    uid:res.data.uid,
                    createdAt:res.data.createdAt,
                    updatedAt:res.data.updatedAt
                }
                Cookies.set("authToken",token.token,{expires:60})
                data.data = neededData as any
                return data
            }
        } catch (error:any) {
            data.success=false
            if(axios.isAxiosError(error)) {
                const axiosError:AxiosError = error
                if(axiosError.status === 400) {
                    const message:any[] = (axiosError?.response?.data as any).message.split(":")
                    if(message) {
                        (data as any).errors[message[0]] = message[1]
                    }
                    return data
                }
                if(axiosError.status == 406) {
                    const messages:any = axiosError?.response?.data
                    data.errors.email = messages?.email ?? "";
                    data.errors.passowrd = messages?.password ?? "";
                    data.errors.firstname = messages?.firstname ?? "";
                    data.errors.lastname = messages?.lastname ?? "";
                    return data
                }
            }
        }
    }
    static async login(info:loginType) {
        
        let data = {
            success:true,
            data:undefined,
            errors:{
                email:"",
                passowrd:"",
            }
        }
        try {
          
            const res = await axios.post(`${url}/auth/login`,info)
            if(res.data) {
                const token = res.data.token
                const neededData = {
                    id:res.data.id,
                    firstname:res.data.firstname,
                    lastname:res.data.lastname,
                    email:res.data.email,
                    role:res.data.role,
                    uid:res.data.uid,
                    createdAt:res.data.createdAt,
                    updatedAt:res.data.updatedAt
                }
                Cookies.set("authToken",token.token,{expires:60})
                data.data = neededData as any
                return data
            }
        } catch (error:any) {
            data.success=false
         
            if(axios.isAxiosError(error)) {
                const axiosError:AxiosError = error
                if(axiosError.status === 400) {
                    const message:any[] = (axiosError?.response?.data as any).message.split(":")
                    if(message) {
                        (data as any).errors[message[0]] = message[1]
                    }
                    return data
                }
                if(axiosError.status == 406) {
                    const messages:any = axiosError?.response?.data
                    data.errors.email = messages?.email ?? "";
                    data.errors.passowrd = messages?.password ?? "";
                    return data
                }
            }
        }
    }
}



export default Auth