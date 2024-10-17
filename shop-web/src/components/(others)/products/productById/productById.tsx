
import {  SingleProductType } from "../../../../lib/utils/types/productTypes"

import AddToCart from "./assets/addTo/AddToCart";
import ProductMedia from "./assets/productMedia"
import { GoStar } from "react-icons/go";



export default function ProductById({product}:{
    product:SingleProductType
}) {
    const {media,category,quantity,sold} = product
    const remainingQuantity = quantity - sold;
    const widthPercentage = (remainingQuantity / quantity) * 100;

    return (
        <section className="flex justify-center items-center font-poppins max-w-[1100px] mx-auto">
            <div className="flex gap-12 items-center lg:items-start w-full lg:flex-row flex-col md:flex-row">
                <ProductMedia medias={media}/>
                <div className="flex flex-col gap-10 w-full max-w-[491px] md:max-w-[460px] mx-auto">
                    <div className="flex flex-col gap-3 w-full">
                        <h4 className=" text-[#666666] font-volkhov text-sm dark:text-light ">E-commerce</h4>
                        <div className="flex flex-col">
                            <div className="flex justify-between items-center">
                                <h1 className=" capitalize font-bold font-volkhov md:text-2xl dark:text-white text-xl">{product.name}</h1>
                                <div className=" rounded-full text-xl text-black dark:text-white border border-black/20 dark:border-white active:scale-95 hover:bg-dark/30 dark:hover:bg-white/30 transition-all duration-300 p-1 cursor-pointer">
                                    <GoStar />
                                </div>
                            </div>
                            <div className="text-base dark:text-white">
                                {/**ratings later */}
                                <GoStar />
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <p className="  text-lg font-bold  dark:text-white">${product.price}</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <p className="text-sm text-[#666666] dark:text-light">
                            {quantity < 10 ?"Only" :""}
                            <span  className="font-bold ">{quantity}</span> item&#40;s&#41; left in stock!</p>
                            <div className="rounded-full p-[0.15rem] bg-gray-300 relative flex items-center justify-start">
                                <div className="absolute w-full h-full bg-[#EF2D2D] rounded-full left-0" style={{width:`${widthPercentage}%`}}>

                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <h3 className="  font-semibold text-lg dark:text-white">Sizes</h3>
                            <div className="flex flex-wrap gap-2">
                                {product.sizes.map((size,index) => {
                                    return (
                                        <div key={index} className={`border border-[#8A8A8A]  text-center py-2 rounded-md text-[#8A8A8A] hover:bg-gray-300/70 transition-all duration-300  dark:text-light dark:hover:bg-white/70 capitalize p-4 text-xl`}>
                                            {size}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <AddToCart product={product}/>
                </div>
            </div>
        </section>
    )
}