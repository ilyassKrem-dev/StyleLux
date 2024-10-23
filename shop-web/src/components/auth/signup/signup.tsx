import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUpType } from "../../../lib/utils/types/authTypes";
import { validateSignUp } from "../../../lib/utils/validation/validationAuth";
import Auth from "../../../lib/api/auth/Auth";
import { UseDispatch, useDispatch } from "react-redux";
import { setSession } from "../../../assets/redux/session/sessionReducer";


export default function SignUp() {
    const dispatch = useDispatch()
    const router = useNavigate()
    const [info,setInfo] = useState<signUpType>({
        firstname:"",lastname:"",email:"",number:"",password:"",con_password:""
    })
    const [errors,setErrors] = useState<signUpType>({
        firstname:"",lastname:"",email:"",number:"",password:"",con_password:""
    })
    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        const {name,value} = e.target
        setErrors(prev =>({...prev,[name]:""}))
        setInfo(prev =>({...prev,[name]:value}))
    }
    const handleSignUp = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const check = validateSignUp(info)
        if(!check.success) return setErrors(check.errors)
        const res= await Auth.signUp(info)
        if(res?.success) {
    
            dispatch(setSession(res?.data as any))
            router("/")
        }
        if(!res?.success) {
            return setErrors(res?.errors as any)
        }

    }  
    return (
        <>
            <form onSubmit={handleSignUp}  className="flex flex-col gap-3 mt-10 justify-center">
                <div className="flex items-center gap-3 max-w-[400px] lg:max-w-[600px] mx-auto">
                    <div className="flex flex-col gap-1 flex-1">
                        <input 
                        type="text"
                        id="firstname" 
                        name="firstname"
                        value={info.firstname}
                        onChange={handleChange}
                        className={`w-full ${errors.firstname ? " border-accent placeholder:text-accent":""}`} 
                        placeholder="First Name" />
                        {errors.firstname&&<p className="h-[30px] text-accent text-sm">{errors.firstname}</p>}
                    </div>
                    <div className="flex flex-col gap-1 flex-1">
                        <input 
                        type="text"
                        id="lastname" 
                        name="lastname"
                        value={info.lastname}
                        onChange={handleChange}
                        className={`w-full ${errors.lastname ? " border-accent placeholder:text-accent":""}`} 
                        placeholder="Last Name" />
                        {errors.lastname&&<p className="h-[30px] text-accent text-sm">{errors.lastname}</p>}
                    </div>
                </div>
                <div className="flex items-center gap-3 max-w-[400px] lg:max-w-[600px] mx-auto">
                    <div className="flex flex-col gap-1 flex-1">
                        <input 
                        type="email"
                        id="email" 
                        
                        name="email"
                        value={info.email}
                        onChange={handleChange}
                        className={`w-full ${errors.email ? " border-accent placeholder:text-accent":""}`} 
                        placeholder="Email" />
                        {errors.email&&<p className="h-[30px] text-accent text-sm">{errors.email}</p>}
                    </div>
                    <div className="flex flex-col gap-1 flex-1">
                        <input 
                        type="text"
                        id="number" 
                        name="number"
                        value={info.number}
                        onChange={handleChange}
                        className={`w-full ${errors.number ? " border-accent placeholder:text-accent":""}`} 
                        placeholder="Phone number" />
                        {errors.number&&<p className="h-[30px] text-accent text-sm">{errors.number}</p>}
                    </div>
                </div>
                <div className="flex items-center gap-3 max-w-[400px] lg:max-w-[600px] mx-auto">
                    <div className="flex flex-col gap-1 flex-1">
                        <input 
                        type="password"
                        id="password" 
                        name="password"
                        value={info.password}
                        onChange={handleChange}
                        className={`w-full ${errors.password ? " border-accent placeholder:text-accent":""}`} 
                        placeholder="Password" />
                        {errors.password&&<p className="h-[30px] text-accent text-sm">{errors.password}</p>}
                    </div>
                    <div className="flex flex-col gap-1 flex-1">
                        <input 
                        type="password"
                        id="con-password" 
                        name="con_password"
                        value={info.con_password}
                        onChange={handleChange}
                        className={`w-full ${errors.con_password ? " border-accent placeholder:text-accent":""}`} 
                        placeholder="Confirm Password" />
                        {errors.con_password&&<p className="h-[30px] text-accent text-sm">{errors.con_password}</p>}
                    </div>
                </div>

                <div className="flex flex-col gap-3 items-center ">
                    <button className="bg-black py-2 w-full rounded-lg capitalize text-white dark:text-black dark:bg-white hover:bg-black/50 transition-all duration-300 active:scale-95 dark:hover:bg-white/50 font-medium">Create account</button>
                    <p className="dark:text-white text-center">Already have an account? <Link to={"/auth/login"} className="text-blue-400 cursor-pointer font-bold dark:text-[#87CEEB]">Login</Link></p>
                </div>
            </form>
        </>
    )
}