import { ChangeEvent, SetStateAction, useState } from "react";
import { CheckoutErrorsCheck } from "../../../../../lib/utils/types/cartType";




export default function EmailInfo({email,setEmail,setErrorsCheck}:{
    email:string;
    setEmail:React.Dispatch<SetStateAction<string>>;
    setErrorsCheck:React.Dispatch<SetStateAction<CheckoutErrorsCheck>>
}) {
    const [error,setError] = useState<boolean>(false)
    const regEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setEmail(value)
        if(value.length === 0) return setError(false)
        setError(!regEmail.test(value))
        setErrorsCheck(prev => ({...prev,email:!regEmail.test(value)}))
    }
    return (
        <div className="flex flex-col gap-3">
            <h3 className="md:text-2xl font-semibold text-lg dark:text-white">Contact</h3>
            <div className="flex flex-col gap-1">
                <input 
                type="email"
                value={email}
                onChange={handleChange} 
                placeholder="Email Address" 
                className=" border-2 border-[#8A8A8A] !w-[300px] sm:!w-full max-[340px]:!max-w-[280px]"
                style={{borderColor:error?"red":"#8A8A8A"}}/>
                {error&&<p className="h-[10px] text-accent text-sm font-bold">Email must be valid</p>}
            </div>
        </div>
    )
}