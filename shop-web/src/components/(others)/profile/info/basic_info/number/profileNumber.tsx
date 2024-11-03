import { ChangeEvent, useEffect,  useState } from "react"
import { useSession } from "../../../../../../assets/shared/wrappers/SessionWrapper";
import { useTitle } from "../../../../../../lib/utils/hooks/hooks";
import { useNavigate } from "react-router-dom";
import User from "../../../../../../lib/api/user/User";
import UserInfo from "../../../../../../lib/api/user/UserInfo";
import NewInput from "../../shared/newInput";
import SaveAndCancel from "../../shared/saveCancel";


export default function ProfileNumber() {
    const {session} = useSession()
    const router = useNavigate()
    const [oldNumber,setOldNumber] = useState<string>("")
    const [number,setNumber] = useState<string>("")
    const [error,setError] = useState<string>("")
    const [loading,setLoading] = useState<boolean>(false)
    
    useEffect(() => {
        const getUserDetails = async() => {
            const res = await new User(session.uid).getUser();
            if(res?.success) {
                setOldNumber((res?.data as any).number ?? "")
                setNumber((res?.data as any).number ?? "")
            }

        }
        getUserDetails()
    },[session])
    
    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        const regNumber = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
        setNumber(value)
        if(value.length>0 &&!regNumber.test(value)) {
            return setError("Phone number is invalid")
        }
        setError("")
    }

    const disabled = number.length ==0 || loading || error.length>0 || number == oldNumber

    const handleSave = async() => {
        if(disabled) return
        setLoading(true)
        const res = await new UserInfo(session.uid).updateNumber(number)
        if(res?.success) {
            setLoading(false)
            router("/profile/info")
        } else {
            setLoading(false)
            setError(res?.error as string)
        }
        
    }

    useTitle("Number")

    return (
        <>
            <div className="flex justify-center items-center dark:text-white">
                <div className="flex flex-col gap-1 items-center">
                    <h1 className="font-semibold text-3xl capitalize mt-4">Number</h1>
                    
                </div>
            </div>
            <div className="mt-10 max-w-[700px] mx-auto">
                <div className="md:p-4 md:border rounded-lg md:border-black/20 md:dark:border-white/20 md:shadow-md md:px-8">
                    <p className=" text-black/80 dark:text-white/80">Here you can change your phone number</p>
                    <div className="flex flex-col gap-10 mt-6">
                        <NewInput 
                        value={number}
                        name="number"
                        handleChange={handleChange}
                        placeHolder="Phone number"
                        error={error}
                        />
                    </div>
                    <SaveAndCancel 
                    loading={loading}
                    handleSave={handleSave}
                    disabled={disabled}/>
                </div>
            </div>
        </>
    )
}