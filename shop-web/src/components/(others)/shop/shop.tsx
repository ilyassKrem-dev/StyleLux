import { IoIosArrowBack } from "react-icons/io";
import Filters from "./assets/filters/filters";
import Products from "./assets/products/products";


export default function Shop() {

    return (
        <div className="py-20 px-12">
            <div className="flex justify-center items-center w-full flex-col gap-3">
                <h1 className="font-bold text-4xl font-volkhov dark:text-white">Shop</h1>
                <div className="flex gap-5 items-center dark:text-light">
                    <p className=" font-medium">Home</p>
                    <span className=" rotate-180 text-sm"><IoIosArrowBack /></span>
                    <p className=" font-medium">Shop</p>
                </div>
            </div>
            <div className="mt-10 flex items-center gap-2">
                <Filters />
                <Products />
            </div>
        </div>
    )
}