import { useEffect, useState } from "react"
import { useTitle } from "../../../../lib/utils/hooks/hooks"
import { ProductType } from "../../../../lib/utils/types/productTypes"
import { useSession } from "../../../../assets/shared/wrappers/SessionWrapper"
import User from "../../../../lib/api/user/User"
import FavoriteTemplate from "./favoriteTemplate"




export default function ProfileFavorites() {
    useTitle("Favorites")
    const [favorites,setFavorites] = useState<ProductType[]|null>(null)
    const {session} = useSession()
    useEffect(() => {
        const getAllFavorites = async() => {
            const res =await new User(session.uid).getAllFavorites()
            if(res?.success) return setFavorites(res.data)
        }
        getAllFavorites()
    },[session])
   
    const handleUnfavorite = async(productId:string) => {
        const res =await new User(session.uid).changeFavorites(productId)
        if(res?.success) {
            setFavorites((prev:any) => prev?.filter((favorite:ProductType) => favorite.uid !== productId))
        }
    }
    return (
        <div className="max-w-[900px] mx-auto p-8 flex-1">
            <div className="flex flex-col gap-1 items-center justify-center">
                <h1 className="font-semibold text-2xl capitalize dark:text-white">Favorites</h1>
                <p className="break-words text-center dark:text-white">Here you can view your favorites products</p>
            </div>
            <div className="mt-6 flex flex-col gap-4">
                {favorites&&
                favorites.map((favorite,index) => {
                    return (
                        <FavoriteTemplate
                        key={index} 
                        product={favorite} 
                        handleUnfavorite={handleUnfavorite}/>
                    )
                })}

            </div>
    
        </div>
    )
}