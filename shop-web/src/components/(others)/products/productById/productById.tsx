
import {  SingleProductType } from "../../../../lib/utils/types/productTypes"
import AddToCart from "./assets/addTo/AddToCart";
import ProductMedia from "./assets/productMedia"
import { GoStar } from "react-icons/go";
import { useEffect } from "react";
import { useSession } from "../../../../assets/shared/wrappers/SessionWrapper";
import ProductFavorite from "./assets/favorites&stars/productFavorite";

export default function ProductById({product}:{
    product:SingleProductType
}) {
    const {media,quantity,sold} = product
    const remainingQuantity = quantity - sold;
    const {session} = useSession()
    const widthPercentage = (remainingQuantity / quantity) * 100;
    useEffect(() => {
        const name = (product as any)?.name.charAt(0).toUpperCase() + product?.name.substring(1) as string
        document.title = name;
    }, [product]);

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
                                {session&&<ProductFavorite 
                                userId={session.uid}
                                productId={product.uid}
                                isFavorite={product.isFavorite}
                                />}
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
                            <span  className="font-bold ">{quantity-sold}</span> item&#40;s&#41; left in stock!</p>
                            <div className="rounded-full p-[0.15rem] bg-gray-300 relative flex items-center justify-start">
                                <div className="absolute w-full h-full bg-[#EF2D2D] rounded-full left-0" style={{width:`${widthPercentage}%`}}>

                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <AddToCart product={product}/>
                </div>
            </div>
        </section>
    
    )
}