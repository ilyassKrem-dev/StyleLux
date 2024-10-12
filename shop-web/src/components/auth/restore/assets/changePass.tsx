import { ChangeEvent, useState } from "react"
import Auth from "../../../../lib/api/auth/Auth";
import { useNavigate } from "react-router-dom";

type PasswordsType = {
    password:string;
    con_password:string
    }

export default function ChangePass({email,coded}:{
    email:string;
    coded:string;
}) {
    const [passwords,setPasswords] = useState<PasswordsType>({
        password:"",
        con_password:""
    })
    const [errors,setErros] = useState<PasswordsType>({
        password:"",
        con_password:""
    })
    const router = useNavigate()
    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        const {name,value} =  e.target
        setPasswords(prev => ({...prev,[name]:value}))
        setErros(prev => ({...prev,[name]:""}))
    }
    const handleSave = async() => {
        const {password,con_password} = passwords
        if(password.length <6) {
            return setErros({
                password:"Password must be more than 6 character",
                con_password:""
            })
        }
        if(password !== con_password) {
            return setErros({
                password:"",
                con_password:"Passsword's dont match"
            })
        }
        const res= await Auth.changePass(email,coded,passwords.password,passwords.con_password)
        if(res?.success) {
            router("/auth/login")
        }
    }
    return (
        <>
            <h1 className=" font-volkhov text-xl dark:text-white capitalize">Enter Your new Password</h1>
            <div className="flex flex-col gap-1 mt-7">
                <input type="password" 
                name="password" 
                id="con_password" 
                className={`${errors.password ? "border-accent":""}`} 
                value={passwords.password}
                onChange={handleChange}
                placeholder="Password" />
                <p className="h-[15px] text-sm text-accent">{errors.password}</p>
                <input type="password" 
                name="con_password" 
                id="con_password" 
                onChange={handleChange}
                className={`${errors.con_password ? "border-accent":""}`} 
                value={passwords.con_password}
                
                placeholder="Confirm Password" />
                <p className="h-[15px] text-sm text-accent">{errors.con_password}</p>
            </div>
            <button className="rounded-lg py-2 w-full text-center text-base bg-black dark:bg-white text-white dark:text-black active:scale-95 hover:bg-dark/70 dark:hover:bg-white/80 transition-all duration-300 mt-1" onClick={handleSave}>
                Submit
            </button>   
            
        </>
    )
}