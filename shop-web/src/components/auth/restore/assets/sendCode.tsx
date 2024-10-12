import { SetStateAction, useState } from "react"
import { Link } from "react-router-dom"
import Auth from "../../../../lib/api/auth/Auth"

import LoadingAnimation from "../../../../assets/shared/loadingAnmation";


export default function SendCode({code,setNext,email,setEmail,setCoded}:{
    code:string;
    setNext:React.Dispatch<SetStateAction<number>>;
    email:string;
    setEmail:React.Dispatch<SetStateAction<string>>;
    setCoded:React.Dispatch<SetStateAction<string>>;
}) {
    const [error,setError] = useState<string>("")
    const [loading,setLoading] = useState<boolean>(false)
    const handleSend = async() => {
        
        if(loading) return
        const regEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        if(!regEmail.test(email)) {
            return setError("Email is not valid")
        }
        setLoading(true)
        const res =await Auth.restore(email,code)
        if(res?.success) {
            setCoded(res.data)
            setLoading(false)
            setNext(1)
        } else {
            setLoading(false)
            setError(res?.error as string)
        }
    }
    return (
        <>
            <h1 className=" font-volkhov text-xl dark:text-white">Forget Password</h1>
            <div className="flex flex-col gap-1 mt-7">
                <input type="text" 
                name="email" 
                id="email" 
                className={`${error ? "border-accent":""}`} 
                value={email}
                onChangeCapture={() => setError("")}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email" />
                <p className="h-[10px] text-sm text-accent">{error}</p>
            </div>
            <button className="rounded-lg py-2 w-full text-center text-base bg-black dark:bg-white text-white dark:text-black active:scale-95 hover:bg-dark/70 dark:hover:bg-white/80 transition-all duration-300 mt-1" onClick={handleSend}>
                {loading?<LoadingAnimation />:"Send Confirmation Code"}
                
            </button>   
            <p className="dark:text-white text-center">Already have an account? <Link to={"/auth/login"} className="text-blue-400 cursor-pointer font-bold dark:text-[#87CEEB]">Login</Link></p> 
        </>
    )
}