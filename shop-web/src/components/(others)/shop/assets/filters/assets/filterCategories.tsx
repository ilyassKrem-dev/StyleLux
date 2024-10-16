import { useEffect, useState } from "react"
import { CategoryType } from "../../../../../../lib/utils/types/categoryTypes"
import Category from "../../../../../../lib/api/category/Category"
import { SetURLSearchParams } from "react-router-dom"


export default function FilterCategories({searchParams,setSearchParams,isOverlay}:{
    searchParams:URLSearchParams;
    setSearchParams:SetURLSearchParams;
    isOverlay?:boolean
}) {
    const [catergories,setCategories] = useState<CategoryType[]|null>(null)

    const categorieParams = searchParams.get("category")

    const handleCategorieClick = (cat:string) => {
        const params = Object.fromEntries(searchParams)
        if(categorieParams === cat) {
            delete params.category
        } else{
            params.category = cat
        }
        setSearchParams({...params})
    }
    
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
        <div className={`flex flex-col gap-3  ${isOverlay ? " justify-center items-center":"w-[300px]"}`}>
            <div className="flex justify-between items-center">
                <h4  className={`font-volkhov text-lg dark:text-lighter ${isOverlay ? "text-xl":""}`}>
                    Categories
                </h4>

            </div>
            <div className={` ${isOverlay ?" grid grid-cols-2 gap-3" :"flex items-center flex-wrap gap-1"}`}>
                {catergories&&catergories.map((cat) => {
                    const {name,uid} = cat
                    const checked = name === categorieParams
                    return (
                        <p 
                        key={uid} 
                        className={`text-[#8A8A8A] cursor-pointer border-[#8A8A8A] w-fit rounded-full py-1 px-4 hover:bg-gray-300/70 active:scale-95 transition-all duration-300 dark:text-light dark:hover:bg-white/70 capitalize  ${checked ?"bg-gray-300/70 dark:bg-white/70" :""} ${isOverlay ?"text-lg" :"text-sm"}`} onClick={() => handleCategorieClick(name)}>
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