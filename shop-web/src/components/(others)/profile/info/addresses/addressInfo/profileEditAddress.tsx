import { ChangeEvent, useEffect, useState } from "react"
import { useSession } from "../../../../../../assets/shared/wrappers/SessionWrapper"
import User from "../../../../../../lib/api/user/User"
import NewInput from "../../shared/newInput"
import countriesList from "../../../../checkout/assets/delivery/countriesList.json"
import { useNavigate } from "react-router-dom"
import LoadingAnimation from "../../../../../../assets/shared/loadingAnmation"
import UserInfo from "../../../../../../lib/api/user/UserInfo"
type AllAddressType = {
    address:string,
    country:string,
    postalCode:string,
    city:string
}


export default function ProfileEditAddress() {
    const router = useNavigate()
    const [loading,setLoading] = useState<boolean>(false)
    const [oldAddress,setOldAddress] = useState<AllAddressType>({
        address:"",country:"",postalCode:"",city:""
    })
    const [allAddress,setAllAddress] = useState<AllAddressType>({
        address:"",country:"",postalCode:"",city:""
    })
    const {address,country,postalCode,city} = allAddress

    const [errors,setErrors] = useState<AllAddressType>({
        address:"",country:"",postalCode:"",city:""
    })
    const {session} = useSession()
    useEffect(() => {
        if(!session) return
        const getInfo = async () => {
            const res = await new User(session.uid).getUser()
            if(res?.success) {
                const data = (res.data as any).addresses
                if(!data) return
                setOldAddress({
                    address:data.address,
                    country:data.region,
                    postalCode:data.postalCode,
                    city:data.city
                })
                setAllAddress({
                    address:data.address,
                    country:data.region,
                    postalCode:data.postalCode,
                    city:data.city
                })
            }
        }
        getInfo()
    },[session])

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        const {name,value} = e.target
        setAllAddress(prev => ({...prev,[name]:value}))
        setErrors(prev => ({...prev,[name]:""}))
    }
    const handleSelectChange = (e:ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value
        setAllAddress(prev => ({...prev,country:value}))
    }
    const disabled = !address || !country ||!postalCode ||!city || Object.values(allAddress).toString()== Object.values(oldAddress).toString() || loading || errors && Object.values(errors).some(err => err)
    

    const handleSave = async() => {
        if(disabled) return
        setLoading(true)
        if(address.length==0||city.length==0||postalCode.length==0) {
            setLoading(false)
        }
        if(address.length==0) return setErrors(prev => ({...prev,address:"Address is required"}))
        if(city.length==0) return setErrors(prev => ({...prev,city:"City is required"}))
        if(postalCode.length==0) return setErrors(prev => ({...prev,postalCode:"Postal Code is required"}))
        const res= await new UserInfo(session.uid).updateAddress(allAddress)
        if(res?.success) {
            setLoading(false)
            router("/profile/info")
        } else {
            setErrors(res?.errors as any)
            setLoading(false)
        }
    }
    return (
        <>
            <div className="flex justify-center items-center dark:text-white">
                <div className="flex flex-col gap-1 items-center">
                    <h1 className="font-semibold text-3xl capitalize mt-4">Address</h1>
                    
                </div>
            </div>
            <div className="mt-10 max-w-[700px] mx-auto">
                <div className="md:p-4 md:border rounded-lg md:border-black/20 md:dark:border-white/20 md:shadow-md md:px-8">
                    <p className=" text-black/80 dark:text-white/80">Here you can change your address info</p>
                    <div className="flex flex-col gap-4 mt-6">
                        <div className="w-full">
                            <select 
                            name="countries" 
                            id="countries" 
                            className="border border-[#8A8A8A] w-full rounded-md max-w-full"
                            value={allAddress.country ?? ""} 
                            onChange={handleSelectChange}>
                                {allAddress.country&&countriesList.map((country,index) => {
                                    return (
                                        <option key={index} value={country.code}>{country.name}</option>
                                    )
                                })}
                                
                            </select>
                        </div>
                        <NewInput 
                        placeHolder="Address"
                        value={allAddress.address}
                        name="address"
                        error={errors.address}
                        handleChange={handleChange}
                        />
                        <div className="flex items-center gap-2 max-[480px]:flex-col">
                            <div className="flex-1 max-[480px]:w-full">
                                <NewInput 
                                placeHolder="City"
                                value={allAddress.city}
                                name="city"
                                error={errors.city}
                                handleChange={handleChange}
                                />
                            </div>
                            <div className="flex-1 max-[480px]:w-full">
                                <NewInput 
                                placeHolder="Postal Code"
                                value={allAddress.postalCode}
                                name="postalCode"
                                error={errors.postalCode}
                                handleChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mt-10 flex flex-row justify-end items-center gap-4">
                        <button onClick={() => router("/profile/info")} className=" font-semibold dark:text-white active:scale-95 rounded-full px-3 py-2 hover:bg-black/70 hover:text-white transition-all duration-300 dark:hover:text-black dark:hover:bg-white/70">
                            Cancel
                        </button>
                        <button className="rounded-full text-white bg-black px-8 py-2 font-semibold active:scale-95 dark:bg-white dark:text-black hover:bg-black/70 dark:hover:bg-white/70 transition-all duration-300 disabled:cursor-default disabled:bg-black/50 dark:disabled:bg-white/50 disabled:active:scale-100"
                        disabled={disabled}
                        onClick={handleSave} 
                        >
                            {loading?<LoadingAnimation className="!p-2"/>:"Save"}
                        
                        </button>
                    </div>
                </div>
                
            </div>
        </>
    )
}