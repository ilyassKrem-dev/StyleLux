import { Elements } from "@stripe/react-stripe-js";
import CheckoutInfo from "./assets/checkoutInfo";
import { loadStripe } from "@stripe/stripe-js"
import ItemsInfo from "./assets/itemsInfo";

const stripePromise = loadStripe(import.meta.env.VITE_PUBLIC_STRIPE_KEY)

export default function CheckOut() {

    return (
        <div className="py-10 md:py-24">
            <div className="flex flex-col max-w-[1100px] mx-auto">
                <div className="flex justify-center items-center">
                    <h1 className="text-3xl font-bold dark:text-white">Checkout</h1>
                </div>
                <Elements stripe={stripePromise}>
                    <div className="mt-5 flex md:items-start border-t border-[#A8A8A8] md:flex-row flex-col-reverse justify-center items-center md:justify-normal">
                        <CheckoutInfo />
                        <ItemsInfo />
                    </div>
                </Elements>
            </div>
        </div>
    )
}