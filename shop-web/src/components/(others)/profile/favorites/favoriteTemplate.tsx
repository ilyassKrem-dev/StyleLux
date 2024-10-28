import { Link } from "react-router-dom";
import { ProductType } from "../../../../lib/utils/types/productTypes"




export default function FavoriteTemplate({product,handleUnfavorite}:{
    product:ProductType;
    handleUnfavorite:(arg:string) => void
}) {
    const {media,name,price,quantity,sold} = product
    return (
        <div  className="flex gap-3 border rounded-md border-black/30 dark:border-white/30 justify-between dark:text-white flex-col sm:flex-row">
            <div className="flex gap-1 sm:gap-3 flex-col items-center sm:flex-row sm:items-start">
                <div className=" sm:w-[200px] sm:h-[200px] sm:rounded-l-md rounded-t-md sm:rounded-tr-none  w-full border-b sm:border-b-0 sm:border-r border-black/20 dark:border-white/20">
                    <img 
                    src={media.url as string} 
                    alt={name + "picture"}
                    className="w-full h-full object-cover sm:rounded-l-md rounded-t-md sm:rounded-tr-none" />
                </div>
                <div className="flex flex-col gap-1 py-3 items-center sm:items-start">
                    <p className=" capitalize font-semibold text-xl">{name}</p>
                    <p className="text-sm text-black/70 dark:text-white/70"><span className="font-semibold">{quantity-sold} </span>
                    item&#40;s&#41; left </p>
                </div>
            </div>
            <div className="flex flex-col justify-between p-3 px-6 items-center">
                <p className=" font-bold text-lg">${price.toFixed()}</p>
                <div className="flex flex-col gap-2 items-center"> 
                    <Link target="_blank" to={`/products/${product.uid}`} className=" underline text-sm hover-opacity active:scale-95">
                        Go to product
                    </Link>
                    <button className="bg-black text-white rounded-md px-8 py-2 font-bold hover:bg-black/70 dark:hover:bg-white/70 active:scale-95 transition-all duration-300 dark:bg-white dark:text-black" onClick={() => handleUnfavorite(product.uid)}>
                        Unfavorite
                    </button>
                </div>
            </div>
        </div>
    )
}