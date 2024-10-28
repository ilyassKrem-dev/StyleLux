import { useState } from "react";
import { GoStar,GoStarFill  } from "react-icons/go";
import User from "../../../../../../lib/api/user/User";


interface Props {
    userId:string;
    productId:string;
    isFavorite:boolean
}


export default function ProductFavorite({userId,productId,isFavorite}:Props) {

    const [favorite,setFavorite] = useState<boolean>(isFavorite || false)
    const handleFevorites = async() => {
        const res =await new User(userId).changeFavorites(productId)
        if(res?.success) {
            setFavorite(prev => !prev)
        }
    }
    return (
        <>
            <div className=" rounded-full text-xl text-black dark:text-white border border-black/20 dark:border-white active:scale-95 hover:bg-dark/30 dark:hover:bg-white/30 transition-all duration-300 p-1 cursor-pointer" onClick={handleFevorites}>
                {favorite?<GoStarFill />:<GoStar />}
            </div>
        </>
    )
}