import { useEffect, useState } from "react"
import { CategoryType } from "../../../../../../lib/utils/types/categoryTypes"
import Category from "../../../../../../lib/api/category/Category"


export default function FilterCategories({categorieParams,handleCategorieClick}:{
    categorieParams:string|null;
    handleCategorieClick:(arg:string) => void
}) {
    const [catergories,setCategories] = useState<CategoryType[]|null>(null)
    useEffect(() => {
        const getCategories = async() => {
            const res = await  Category.getAllCategories()
            if(res?.success) {
                setCategories(res.data)
            }
        }
        getCategories()
    },[])
    return (
        <div className="flex flex-col gap-3 w-[300px]">
            <div className="flex justify-between items-center">
                <h4 className=" font-volkhov text-lg dark:text-lighter">
                    Categories
                </h4>

            </div>
            <div className="flex items-center flex-wrap gap-1">
                {catergories&&catergories.map((cat) => {
                    const {name,uid} = cat
                    const checked = name === categorieParams
                    return (
                        <p 
                        key={uid} 
                        className={`text-[#8A8A8A] cursor-pointer border-[#8A8A8A] w-fit rounded-full py-1 px-4 hover:bg-gray-300/70 active:scale-95 transition-all duration-300 dark:text-light dark:hover:bg-white/70 capitalize text-sm ${checked ?"bg-gray-300/70 dark:bg-white/70" :""}`} onClick={() => handleCategorieClick(name)}>
                            {name}
                        </p>
                    )
                })}
                {!catergories&&[...Array(3)].map((_,index) => {
            
                    return (
                        <p 
                        key={index} 
                        className={`text-[#8A8A8A]  border-[#8A8A8A]  rounded-full py-1 px-4 hover:bg-gray-300/70 active:scale-95 transition-all duration-300 dark:text-light dark:hover:bg-white/70 capitalize text-sm w-[80px] h-[20px] bg-[#8A8A8A]/20`} >
                            
                        </p>
                    )
                })}
            </div>
        </div>
    )
}