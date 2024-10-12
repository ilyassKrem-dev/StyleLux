import { useEffect, useState } from "react"
import SendCode from "./assets/sendCode"
import VerifyCode from "./assets/verifyCode"
import ChangePass from "./assets/changePass"



export default function Restore() {
    const [email,setEmail] = useState<string>("")
    const [code,setCode] = useState<string>("")
    const [next,setNext] = useState<number>(0)
    const [coded,setCoded] = useState<string>("")


    
    useEffect(() => { 
        if(next == 2) return
        if(next == 0) return setCode(Math.round(Math.random()*(98786 - 12548)  + 12548).toString())
        
        const id = setInterval(() => {
            setCode(Math.round(Math.random()*(98786 - 12548)  + 12548).toString())
        },300000)
        return () => clearTimeout(id)
    },[next])
    
    return (
        <div className="mt-16 flex flex-col gap-3 font-poppins">
            {next==0&&<SendCode 
            code={code} 
            setNext={setNext}
            email={email}
            setEmail={setEmail}
            setCoded={setCoded}/>}
            {next==1&&
            <VerifyCode 
            email={email} 
            setNext={setNext} 
            code={code}/>}
            {next==2&&<ChangePass email={email} coded={coded}/>}
        </div> 
    )
}