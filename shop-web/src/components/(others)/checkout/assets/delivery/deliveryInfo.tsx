import { ChangeEvent, SetStateAction, useEffect, useState } from "react";
import { CheckoutErrorsCheck, Deliverytype } from "../../../../../lib/utils/types/cartType"
import countriesList from "./countriesList.json"



export default function DeliveryInfo({deliveryInfo,setDeliveryInfo,errorsCheck,setErrorsCheck}:{
    deliveryInfo:Deliverytype;
    setDeliveryInfo:React.Dispatch<SetStateAction<Deliverytype>>;
    errorsCheck:CheckoutErrorsCheck;
    setErrorsCheck:React.Dispatch<SetStateAction<CheckoutErrorsCheck>>

}) {
    const {country,firstname,lastname,city,postalcode,address,save} =deliveryInfo
    const {delivery} = errorsCheck
    const [waitTime,setWaitTime] = useState<boolean>(false)
    useEffect(() => {
        if(country || !waitTime) return
        const token = import.meta.env.VITE_IP_TOKEN
        fetch(`https://ipinfo.io/json?token=${token}`)
                .then(res => res.json())
                    .then(data => setDeliveryInfo(prev => (
                        {...prev,
                            country:data.country,
                            postalcode:data.postal,
                            city:data.city})))
                        .catch(() => setDeliveryInfo(prev => ({...prev,country:""}))) 
    },[country])
    useEffect(() => {
        if(waitTime) return
        const id = setTimeout(() => {
            setWaitTime(true)
        },1000)
        return () => clearTimeout(id)
    },[])
    
    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        const {name,value} = e.target
        setDeliveryInfo(prev => ({...prev,[name]:value}))
        setErrorsCheck(prev => ({...prev,delivery:{...prev.delivery,[name]:false}}))
    }
    return (
        <>
            <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center dark:text-white">
                    <h3 className="text-2xl font-semibold">Delivery</h3>
                </div>
                <div className="flex flex-col gap-3 ">
                    <div className="w-full">
                        <select 
                        name="countries" 
                        id="countries" 
                        className="border-2 border-[#8A8A8A] !w-[300px] sm:!w-full max-[340px]:!max-w-[280px]"
                        value={deliveryInfo.country ?? ""} 
                        onChange={(e) => setDeliveryInfo(prev => ({...prev,country:e.target.value}))}>
                            {country !== null&&countriesList.map((country,index) => {
                                return (
                                    <option key={index} value={country.code}>{country.name}</option>
                                )
                            })}
                            {country == null&&
                            <option  value={"-1"}>. . . .</option>}
                        </select>
                    </div>
                    <div className="flex gap-1 items-center !max-w-[300px] sm:!max-w-full max-[340px]:!max-w-[280px]">
                        <div className="flex flex-col  w-full">
                            <input 
                            type="text"
                            value={firstname}
                            onChange={handleChange}
                            name="firstname" 
                            placeholder="First Name" 
                            className={`border-2  w-full ${delivery.postalcode ? "border-accent":"border-[#8A8A8A]"}`}/>
                            <p className="text-sm text-accent font-semibold h-[10px]">{delivery.firstname ? "Required":""}</p>
                        </div>
                        <div className="flex flex-col w-full">
                            <input 
                            name="lastname"
                            type="text" 
                            value={lastname}
                            onChange={handleChange}
                            placeholder="Last Name" 
                            className={`border-2  w-full ${delivery.postalcode ? "border-accent":"border-[#8A8A8A]"}`}/>
                            <p className="text-sm text-accent font-semibold h-[10px]">{delivery.lastname ? "Required":""}</p>
                        </div>
                    </div>
                    <div className="flex flex-col ">
                        <input 
                            type="text"
                            name="address"
                            value={address}
                            onChange={handleChange} 
                            placeholder="Address" 
                            className={` border-2  !w-[300px] sm:!w-full max-[340px]:!max-w-[280px] ${delivery.address ? "border-accent":"border-[#8A8A8A]"}`}/>
                        <p className="text-sm text-accent font-semibold h-[10px]">{delivery.address ? "Required":""}</p>
                    </div>
                    <div className="flex gap-1 items-center !max-w-[300px] sm:!max-w-full max-[340px]:!max-w-[280px]">
                        <div className="flex flex-col  w-full">
                            <input 
                            type="text" 
                            name="city"
                            value={city}
                            onChange={handleChange}
                            placeholder="City" 
                            className={`border-2  w-full ${delivery.city ? "border-accent":"border-[#8A8A8A]"}`}/>
                            <p className="text-sm text-accent font-semibold h-[10px]">{delivery.city ? "Required":""}</p>
                        </div>
                        <div className="flex flex-col w-full ">
                            <input 
                            type="text"
                            value={postalcode}
                            onChange={handleChange}
                            name="postalcode" 
                            placeholder="Postal Code" 
                            className={`border-2  w-full ${delivery.postalcode ? "border-accent":"border-[#8A8A8A]"}`}/>
                            <p className="text-sm text-accent font-semibold h-[10px]">{delivery.postalcode ? "Required":""}</p>
                        </div>
                    </div>
                    <div className="flex items-center px-1 gap-2">
                        <input 
                        type="checkbox" 
                        name="save" 
                        id="save" 
                        className="scale-150 accent-black dark:accent-white cursor-pointer"
                        checked={save}
                        onChange={(e) => setDeliveryInfo(prev => ({...prev,save:e.target.checked}))} />
                        <label htmlFor="save" className="text-sm text-[#8A8A8A] dark:text-lighter">Save this info for future</label>
                    </div>
                </div>
            </div>
        </>
    )
}