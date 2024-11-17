import { useState, useEffect } from "react"
import Product from "../../../../../lib/api/product/Product"
import { MediaType, SingleProductType } from "../../../../../lib/utils/types/productTypes"
import { useRefresh, useShow } from "../../../../../lib/utils/hooks/hooks";
import Refresh from "../../../shared/refresh";




export default function ProductDetails({id}:{
    id:string|undefined
    
}) {
    const [product,setProduct] = useState<SingleProductType|null>(null)
    const [show] = useShow()
    const [refresh,setRefresh] = useRefresh()
    const [defaultPicture,setDefaultPicture] = useState<MediaType>()
    useEffect(() => {
        const getProduct = async() => {
            const res= await Product.getProduct(id ?? "")
            if(res?.success) {
                setDefaultPicture((res?.data as any).media?.find((media:MediaType) => media.isDefault || media.type == "image") ?? "")
                setProduct(res.data as any)
            }
        }
        getProduct()
    },[refresh,id])
    

    return (
        <div className="bg-white rounded-md flex sm:flex-col  border border-black/5 dark:border-white/5 sm:w-[300px] dark:text-white dark:bg-dark text-black/80 min-h-[390px]" >
            {show&&product&&(
                <div className="p-2 flex flex-col justify-center items-center gap-3 flex-1 sm:flex-grow-0">
                    <h4 className=" text-center font-semibold  text-lg border-b border-black/30 w-fit capitalize break-words">{product.name}</h4>
                    <div className="flex flex-col gap-3 sm:max-w-[200px]">
                        <div className="w-full h-[250px] rounded-lg">
                            <img 
                            src={defaultPicture?.url ?? ""} 
                            alt={product.name + " media"}
                            className="w-full h-full object-cover rounded-lg border border-black/30 dark:border-white/30" />
                        </div>
                        <div className=" overflow-x-auto flex  gap-2 items-center custom-scrollbar pb-1">
                            {product.media.length>1&&product.media.map((media,index) => {
                                const isShowen = media === defaultPicture
                                return (
                                    <div key={index} className={`w-[60px] h-[60px] min-w-[60px] rounded-lg ${isShowen ? "scale-105":" scale-90"} cursor-pointer hover:bg-black/40 group active:scale-95`} onClick={() => setDefaultPicture(media)}>
                                        <img 
                                        src={media?.url ?? ""} 
                                        alt={product.name + " media"}
                                        className="w-full h-full object-cover rounded-lg group-hover:opacity-70 border border-black/5 dark:border-white/5" />
                                    </div>
                                )
                            })}
                            
                        </div>
                        <div className="flex flex-col justify-center items-center font-semibold text-xl">
                            <p>${product.price}</p>
                            <p><span className="text-black/60 dark:text-white/60 font-medium">En stock:</span> {product.quantity - product.sold}</p>
                        </div>
                    </div>
                </div>
            )}
            {show&&!product&&(
                <Refresh refresh={refresh} setRefresh={setRefresh}/>
            )}
        </div>
    )
}