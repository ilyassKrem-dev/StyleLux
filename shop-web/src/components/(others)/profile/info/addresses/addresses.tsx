import { IoIosArrowForward } from "react-icons/io"
import { addressType } from "../../../../../lib/utils/types/userTypes"
import countries from "../../../checkout/assets/delivery/countriesList.json"
import { Link } from "react-router-dom"





export default function Addresses({addresses}:{
    addresses:addressType
}) {

    const {city,region,address,postalCode} = addresses
  
    const findCountry = countries.find(country => country.code == region)
   
    return (
        <div className="flex flex-col  pt-3 border rounded-lg border-black/10 dark:text-white dark:border-white/20 w-full">
            <h1 className=" font-semibold text-xl px-4">Addresses</h1>
            <div className="mt-4 flex flex-col">
                <Link to={"/profile/info/address"} className="relative px-4 group cursor-pointer active:bg-black/20">
                    <div className="flex gap-10 p-3 py-5 items-center justify-between cursor-pointer">
                        <div className="flex sm:items-center flex-col sm:flex-row sm:gap-16 items-start">
                            <p className="font-medium  text-sm text-black/80 cursor-pointer w-[80px] dark:text-white/80">Region</p>
                            <p className=" capitalize text-[1.1rem] flex-1 cursor-pointer text-black/80 dark:text-white">{findCountry?.name}</p>
                        </div>
                        <div className="text-xl">
                            <IoIosArrowForward />
                        </div>
                    </div>
                    <div className="absolute left-0 right-0 bg-black/5 top-0 bottom-0 hidden group-hover:block transition-all duration-300 dark:hover:bg-white/5">

                    </div>
                </Link>
                <Link to={"/profile/info/address"} className="relative px-4 group cursor-pointer active:bg-black/20 border-y border-black/20 dark:border-white/20 dark:active:bg-white/20">
                    <div className="flex gap-10 p-3  py-5 items-center justify-between cursor-pointer">
                        <div className="flex sm:items-center flex-col sm:flex-row sm:gap-16 items-start">
                            <p className="font-medium  text-sm text-black/80 cursor-pointer w-[80px] dark:text-white/80">Address</p>
                            <p className=" text-[1.1rem] flex-1 cursor-pointer max-[360px]:truncate max-[360px]:max-w-[150px] text-black/80 dark:text-white">{address ?? "Not set"}</p>
                        </div>
                        <div className="text-xl">
                            <IoIosArrowForward />
                        </div>
                    </div>
                    <div className="absolute left-0 right-0 bg-black/5 top-0 bottom-0 hidden group-hover:block transition-all duration-300 dark:hover:bg-white/5">

                    </div>
                </Link>
                <Link to={"/profile/info/address"} className="relative px-4 group cursor-pointer active:bg-black/20">
                    <div className="flex gap-10 p-3 py-5 items-center justify-between cursor-pointer">
                        <div className="flex sm:items-center flex-col sm:flex-row sm:gap-16 items-start">
                            <p className="font-medium  text-sm text-black/80 cursor-pointer w-[80px] dark:text-white/80">City</p>
                            <p className=" text-[1.1rem] flex-1 cursor-pointer max-[360px]:truncate max-[360px]:max-w-[150px] text-black/80 dark:text-white">{city ?? "Not set"}</p>
                        </div>
                        <div className="text-xl">
                            <IoIosArrowForward />
                        </div>
                    </div>
                    <div className="absolute left-0 right-0 bg-black/5 top-0 bottom-0 hidden group-hover:block transition-all duration-300 dark:hover:bg-white/5">

                    </div>
                </Link>
                <Link to={"/profile/info/address"} className="relative px-4 group cursor-pointer active:bg-black/20  border-t border-black/20 dark:border-white/20">
                    <div className="flex gap-10 p-3 py-5 items-center justify-between cursor-pointer">
                        <div className="flex sm:items-center flex-col sm:flex-row sm:gap-16 items-start">
                            <p className="font-medium  text-sm text-black/80 cursor-pointer w-[80px] dark:text-white/80">City</p>
                            <p className=" text-[1.1rem] flex-1 cursor-pointer max-[360px]:truncate max-[360px]:max-w-[150px] text-black/80 dark:text-white">{postalCode ?? "Not set"}</p>
                        </div>
                        <div className="text-xl">
                            <IoIosArrowForward />
                        </div>
                    </div>
                    <div className="absolute left-0 right-0 bg-black/5 top-0 bottom-0 hidden group-hover:block transition-all duration-300 dark:hover:bg-white/5">

                    </div>
                </Link>
            </div>
        </div>
    )
}