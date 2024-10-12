import { SetStateAction, useState } from "react"
import Auth from "../../../../lib/api/auth/Auth";



export default function VerifyCode({code,setNext,email}:{
    code:string;
    setNext:React.Dispatch<SetStateAction<number>>;
    email:string
}) {
    const [input,setInput] = useState<string>("")
    const [error,setError] = useState<string>("") 
    const [clicked,setClicked] = useState<boolean>(false)
    const handleVerify = () => {
        if(input !== code) return setError("Incorrect code")
        setNext(2)
    }

    const handleSend = async() => {
        if(clicked) return
        const regEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        if(!regEmail.test(email)) {
            return setError("Email is not valid")
        }
        setClicked(true)
        const res =await Auth.restore(email,code)
        if(res?.success) {
            setClicked(false)
            setNext(1)
        } else {
            setClicked(false)
            setError(res?.error as string)
        }
    }
    return (
        <>
            <h1 className=" font-volkhov text-xl dark:text-white capitalize">Enter the confirmation code</h1>
            <div className="flex flex-col gap-1 mt-7">
                <input type="text" 
                name="text" 
                id="code" 
                className={`${error ? "border-accent":""}`} 
                value={input}
                onChangeCapture={() => setError("")}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Confirmation code" />
                <p className="h-[10px] text-sm text-accent">{error}</p>
            </div>
            <button className="rounded-lg py-2 w-full text-center text-base bg-black dark:bg-white text-white dark:text-black active:scale-95 hover:bg-dark/70 dark:hover:bg-white/80 transition-all duration-300 mt-1" onClick={handleVerify}>
                Recover Account
            </button>   
            <p className="dark:text-white text-center">Already have an account? <span  className="text-blue-400 cursor-pointer font-bold dark:text-[#87CEEB]" onClick={handleSend}>Login</span></p> 
        </>
    )
}