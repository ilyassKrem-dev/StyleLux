
import TopHome from "./assets/topHome";


export default function Home() {
    
    return (
        <div className="flex flex-col py-20 sm:py-28 p-6 max-w-[1200px] mx-auto">
            <TopHome />
            {/*Companies logos */}
            <div className="flex gap-3 bg-gradient-to-b from-[#FFFFFF] to-[#FAFAFA]  dark:bg-gradient-to-b dark:from-[#09090b] dark:bg-dark ">
                <div className="flex flex-col gap-4 mt-16">
                    <h2 className="font-bold font-volkhov sm:text-4xl dark:text-white text-2xl w-fit">Deals of the month</h2>
                    <p className="text-[#8A8A8A] sm:max-w-[400px] text-sm break-words dark:text-light/80 max-w-[300px]">Don’t miss out on amazing savings across a wide range of products!
                    Enjoy exclusive discounts, special bundles.
                    Shop now to grab the best deals before they’re gone!
                    </p>
                    <button className="py-3 px-20 text-white dark:text-black bg-black rounded-lg dark:bg-white hover:bg-dark/50 dark:hover:bg-white/60 transition-all duration-300 active:scale-95 w-fit">Buy Now</button>
                </div>
            </div>
        </div>
    )
}