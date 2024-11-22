
import { SetStateAction } from "react";
import { ProductType } from "../../../../../../../lib/utils/types/productTypes";
import SearchProducts from "./searchProducts";
import { RxCross2 } from "react-icons/rx";





export default function DealProductsAdd({products,setProducts}:{
    products:ProductType[]
    setProducts:React.Dispatch<SetStateAction<ProductType[]>>
 
}) {

    const handleClick = (product:ProductType) => {
        if(products.find(pr => pr == product)) return
        setProducts(prev => [product,...prev])

        
    }
    
    const handleRemove = (e:any,product:ProductType) => {
        e.stopPropagation()
        setProducts(prev => prev.filter(pr => pr !== product))

    }
    return (
        <div className="bg-white dark:bg-dark rounded-md  border border-black/5 dark:border-white/5 transition-all duration-300 text-black/80 dark:text-white  flex-1">
            <div className="flex flex-col  p-3">
                <h1 className=" font-semibold text-xl">Products</h1>
                <p className=" font-medium text-sm text-black/50 dark:text-white/50">Add the products that would have a deal</p>
            </div>
            <SearchProducts handleClick={handleClick}/>
            <div className="p-3 border-t gap-2 h-[450px] overflow-y-auto custom-scrollbar flex flex-col">
                {products.map((product,index) => {
                    const {media,name,price} = product
                    return(
                        <div key={index} className={`flex items-center gap-3 cursor-pointer group  dark:border-white/20 border rounded-md relative`} onClick={() => handleClick(product)}>
                            <div className="w-[70px] h-[100px] rounded-md">
                                <img 
                                src={media.url ?? ""} 
                                alt={name+" media"}
                                loading="lazy"
                                className={`w-full h-full object-cover  rounded-md
                                `} 
                                />
                            </div>
                            <div className="flex items-start flex-col ">
                                <p className=" font-medium capitalize cursor-pointer">{name}</p>
                                <p className="text-sm font-medium cursor-pointer">${price}</p>
                            </div>
                            <div className=" absolute top-2 right-2 rounded-full p-1 text-xl border border-black/10 dark:border-white/10 text-black dark:text-white active:scale-95 z-10 hover:bg-black/20 dark:hover:bg-white/20" onClick={(e) => handleRemove(e,product)}>
                                <RxCross2 />
                            </div>
                        </div>
                    )
                })}
                {products.length==0&&(
                    <p className=" text-center  flex justify-center items-center h-full font-medium text-xl">
                        No product selected
                    </p>
                )}
            </div>
        </div>
    )
}