import { Elements } from "@stripe/react-stripe-js";
import CheckoutInfo from "./assets/checkoutInfo";
import { loadStripe } from "@stripe/stripe-js"
import ItemsInfo from "./assets/itemsInfo";
import { useSession } from "../../../assets/shared/wrappers/SessionWrapper";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaCircleCheck } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { RootState } from "../../../assets/redux/store";
import { useTitle } from "../../../lib/utils/hooks/hooks";
const stripePromise = loadStripe(import.meta.env.VITE_PUBLIC_STRIPE_KEY)
export default function CheckOut() {
    const {session} = useSession()
    const items = useSelector((state:RootState) => state.cart)
    const [completed,setCompleted] = useState<boolean>(false)
    const pathname = useLocation().pathname

    useTitle("Checkout")
    return (
       
        <div className="py-10 md:py-24  mt-5 ">
            <div className="flex flex-col max-w-[1100px] mx-auto ">
                <div className="flex justify-center items-center">
                    <h1 className="text-3xl font-bold dark:text-white">Checkout</h1>
                </div>
                <>
                    {session&&
                    <>
                        {!completed&&
                        (<>
                            {items.length>0?
                            <Elements stripe={stripePromise}>
                                <div className="mt-5 flex md:items-start border-t border-[#A8A8A8] md:flex-row flex-col-reverse justify-center items-center md:justify-normal">
                                    <CheckoutInfo session={session} setCompleted={setCompleted}/>
                                    <ItemsInfo />
                                </div>
                            </Elements>
                            :
                            <div className="flex py-10 justify-center items-center">
                                <div className="flex flex-col gap-4">
                                <h3 className="font-semibold break-words text-center  dark:text-white text-lg">You have no products in cart</h3>
                                <Link to="/shop" className="w-full">
                                    <button className="px-4 py-2 text-white dark:text-black bg-black dark:bg-white active:scale-95 transition-all duration-300 rounded-md hover:bg-black/40  dark:hover:bg-white/40 w-full">Shop</button>
                                </Link>
                                
                                </div>
                            </div>}
                        </>)
                        }
                        {completed&&
                        <div className="h-full flex justify-center items-center py-24">
                            <div className="flex flex-col gap-3">
                                <div className="flex gap-1 flex-col items-center">
                                    <div className="text-2xl text-green-500">
                                        <FaCircleCheck />
                                    </div>
                                    <p className=" font-semibold text-center break-words dark:text-white">Thank you for your purchase! Your order has been successfully completed.</p>
                                </div>
                                <Link to={"/profile/orders"} className="w-full">
                                    <button className="px-4 py-2 text-white dark:text-black bg-black dark:bg-white active:scale-95 transition-all duration-300 rounded-md hover:bg-black/40  dark:hover:bg-white/40 w-full font-semibold">My orders</button>
                                </Link>
                            </div>
                        </div>}
                        
                    </>}


                    {!session&&
                    <div className="flex justify-center items-center py-10">
                        <div className="flex flex-col gap-4">
                            <h3 className="font-semibold break-words text-center  dark:text-white">You must be logged in to be able to access this page</h3>
                            <Link to={"/auth/login?to="+encodeURIComponent(pathname)} className="w-full">
                                <button className="px-4 py-2 text-white dark:text-black bg-black dark:bg-white active:scale-95 transition-all duration-300 rounded-md hover:bg-black/40  dark:hover:bg-white/40 w-full">Login</button>
                            </Link>
                            
                        </div>
                    </div>}
                </>
            </div>
        </div>
     
    )
}