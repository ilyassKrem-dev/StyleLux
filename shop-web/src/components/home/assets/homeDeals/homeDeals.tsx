import { useEffect, useState } from "react"
import { DealDetailsType } from "../../../../lib/utils/types/dealTypes"
import Deal from "../../../../lib/api/deal/Deal"
import DealTime from "./dealTime"
import { IoIosArrowBack,IoIosArrowForward  } from "react-icons/io";
import React from "react";
import { ProductType } from "../../../../lib/utils/types/productTypes";
import { useSize } from "../../../../lib/utils/hooks/hooks";
import { Link } from "react-router-dom";




const DealTimeMemo = React.memo(DealTime)
export default function HomeDeals() {
    const [deals,setDeals] = useState<DealDetailsType[]>([])
    const [currentDeal,setCurrentDeal] = useState<number>(0)
    useEffect(() => {
        const getDeals = async() => {
            const res= await Deal.getDealsHome()
            if(res?.success) setDeals(res.data)
        }
        getDeals()
    },[])
    const getCurrentDeal = ():DealDetailsType => {
        return deals[currentDeal]
    }

    const getCurrentDealProducts = ():ProductType[] => {
        return deals[currentDeal].products
    }

    const handleChangeDeal = (string:"back"|"forward") => {
        if(string == "back") {
            return setCurrentDeal(prev => prev == 0 ? deals.length -1 : prev - 1)
        }
        setCurrentDeal(prev => prev == deals.length -1 ? 0: prev + 1)
        
    }
    const {w} = useSize()
    return (
        <>
            {deals.length>0&&
            <div className="flex gap-3 bg-gradient-to-b from-[#FFFFFF] to-[#FAFAFA]  dark:bg-gradient-to-b dark:from-[#09090b] dark:bg-dark h-[500px] mt-24 items-start w-full max-[650px]:flex-col max-[650px]:items-center max-[650px]:h-full mb-[80px]">
                <div className="flex flex-col gap-4">
                    <h2 className="font-bold font-volkhov sm:text-4xl dark:text-white text-2xl w-fit">{getCurrentDeal().name}</h2>
                    <p className="text-[#8A8A8A] sm:max-w-[400px] text-sm break-words dark:text-light/80 max-w-[300px]">Don&apos;t miss out on amazing savings across a wide range of products!
                    Enjoy exclusive discounts, special bundles.
                    Shop now to grab the best deals before they’re gone!
                    </p>
                    <Link to={"/shop"} className="w-full">
                        <button className="py-3 px-20 text-white dark:text-black bg-black rounded-lg dark:bg-white hover:bg-dark/50 dark:hover:bg-white/60 transition-all duration-300 active:scale-95 w-fit">Buy Now</button> 

                    </Link>
                    <div className="mt-4 flex flex-col gap-4">
                        <h4 className="font-medium break-words text-2xl dark:text-white">Hurry, Before It&apos;s Too Late!</h4>
                        <DealTimeMemo endDate={getCurrentDeal().endDate}/>
                    </div>
                    {deals.length>1&&
                    <div className="mt-2 flex gap-2 items-center self-end max-[650px]:self-center">
                        <button className="text-xl bg-white rounded-full shadow-[0px_0px_4px_0px_rgba(0,0,0,1)] p-2 active:scale-95 hover:bg-dark/5 cursor-pointer transition-all duration-300 dark:text-white dark:bg-dark dark:shadow-[0px_0px_4px_0px_rgba(255,255,255,1)] dark:hover:bg-white/5" onClick={() => handleChangeDeal("back")}>
                            <IoIosArrowBack />
                        </button>
                        <button className="text-xl bg-white rounded-full shadow-[0px_0px_4px_0px_rgba(0,0,0,1)] p-2 active:scale-95 hover:bg-dark/5 cursor-pointer transition-all duration-300 dark:text-white dark:bg-dark dark:shadow-[0px_0px_4px_0px_rgba(255,255,255,1)] dark:hover:bg-white/5" onClick={() => handleChangeDeal("forward")}>
                            <IoIosArrowForward />
                        </button>
                    </div>}
                </div>
                <div className="flex-1 h-[412px] flex items-start  gap-4 ">
                    <Link to={`/products/${getCurrentDealProducts()[0].uid}`}
                    target="_blank"   
                    className="w-[300px] h-full relative">
                        <img 
                        src={getCurrentDealProducts()[0].media.url ?? ""} 
                        alt={getCurrentDealProducts()[0].name}
                        className="h-full w-full object-cover border border-black/10 dark:border-white/10 cursor-pointer" />
                        <div className="bottom-5 absolute left-4 bg-white dark:bg-dark w-[150px] h-[80px] shadow-md flex justify-center items-center flex-col dark:text-white cursor-pointer">
                            <p className="  text-xl">{getCurrentDeal().discount}% OFF</p>
                        </div>
                    </Link>
                    {w>900&&
                    <div className="flex-1 flex-col flex h-full">
                        <div className="flex h-[350px] w-full gap-4">
                            {w>1200&&
                            getCurrentDealProducts().slice(1,3).map((product,index) => {
                                const {media,name} = product
                                return( 
                                    <Link 
                                    to={`/products/${product.uid}`}
                                    target="_blank"   
                                    key={index} 
                                    className={`h-full ${index === 0 ?"w-[250px]" :"flex-1"}`}>
                                        <img 
                                        src={media.url ?? ""} 
                                        alt={name}
                                        className="h-full w-full object-cover border border-black/10 dark:border-white/10" />
                                        
                                    </Link>
                                )
                            })}
                            {w<1200&&
                            getCurrentDealProducts().slice(1).map((product,index) => {
                                const {media,name} = product
                                return( 
                                    <Link
                                    to={`/products/${product.uid}`}
                                    target="_blank"  
                                    key={index} className={`h-full ${index === 0 ?"w-full" :"w-[100px]"}`}>
                                        <img 
                                        src={media.url ?? ""} 
                                        alt={name}
                                        className="h-full w-full object-cover border border-black/10 dark:border-white/10" />
                                        
                                    </Link>
                                )
                            })}
                        </div>
                       {deals.length>1&&
                       <div className="w-full flex-1 flex items-end pb-1 gap-4">
                            {[...Array(deals.length)].map((_,index) => {

                                return (
                                    <div key={index} className={`rounded-full p-1  w-fit ${index == currentDeal ? "bg-black outline outline-offset-[5px] outline-1 dark:bg-white dark:outline-white":"bg-gray-400"} cursor-pointer active:scale-95 `} 
                                    onClick={() => setCurrentDeal(index)}
                                    />
                                )
                            })}
                        </div>}
                    </div>}
                </div>
            </div>}
        
        </>
    )
}