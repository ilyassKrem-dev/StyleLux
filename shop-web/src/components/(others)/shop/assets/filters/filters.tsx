
import { useSearchParams } from "react-router-dom"
import { sizesList } from "../misc/filtersList"
import FilterCategories from "./assets/filterCategories"


export default function Filters() {
    const [searchParams,setSearchParams] = useSearchParams()
    const sizeParams = searchParams.get("size")
    const genderParams = searchParams.get("gender")
    const categorieParams = searchParams.get("category")
    const handleSizeClick = (size:string) => {
        const params = Object.fromEntries(searchParams)
        if(sizeParams === size) {
            delete params.size
        } else {
            params.size = size
        }
        setSearchParams({...params})
    }
    const handleGenderClick = (gender:string) => {
        const params = Object.fromEntries(searchParams)
        if(genderParams === gender) {
            delete params.gender
        } else{
            params.gender = gender
        }
        setSearchParams({...params})
    }
    const handleCategorieClick = (cat:string) => {
        const params = Object.fromEntries(searchParams)
        if(categorieParams === cat) {
            delete params.category
        } else{
            params.category = cat
        }
        setSearchParams({...params})
    }
    return (
        <>
            <div className="flex flex-col gap-6 max-w-[300px]">
                <h1 className=" font-volkhov text-2xl mb-2 dark:text-white">Filters</h1>
                <div className="flex flex-col gap-3">
                    <h4 className=" font-volkhov text-lg dark:text-lighter">Size</h4>
                    <div className="flex flex-wrap items-center gap-3 max-w-[150px]">
                        {sizesList.map((size,index) => {
                            const checked = sizeParams == size
                            return (
                                <div key={index} className={`border border-[#8A8A8A] w-[40px] text-center py-2 rounded-md text-[#8A8A8A] cursor-pointer active:scale-95 hover:bg-gray-300/70 transition-all duration-300  dark:text-light dark:hover:bg-white/70 text-sm capitalize ${checked ?"dark:bg-white/70 bg-gray-300/70":""}`} onClick={() => handleSizeClick(size)}>
                                    {size}
                                </div>
                            )
                        })}
                    </div>
                </div>  
                <div className="flex flex-col gap-3">
                    <h4 className=" font-volkhov text-lg dark:text-lighter">Gender</h4>
                    <div className="flex gap-2 max-w-[150px] flex-col text-sm">
                        <p className={`text-[#8A8A8A] cursor-pointer border-[#8A8A8A] w-fit rounded-full py-1 px-4 hover:bg-gray-300/70 active:scale-95 transition-all duration-300 dark:text-light dark:hover:bg-white/70 ${genderParams === "m" ?"bg-gray-300/70 dark:bg-white/70" :""}`} onClick={() => handleGenderClick("m")}>Male</p>
                        <p className={`text-[#8A8A8A] cursor-pointer border-[#8A8A8A] w-fit rounded-full py-1 px-4 hover:bg-gray-300/70 active:scale-95 transition-all duration-300 dark:text-light dark:hover:bg-white/70 ${genderParams === "f" ?"bg-gray-300/70 dark:bg-white/70" :""}`} onClick={() => handleGenderClick("f")}>Female</p>
                    </div>
                </div>
                <FilterCategories 
                categorieParams={categorieParams} 
                handleCategorieClick={handleCategorieClick}/>
            </div>   
        </>
    )
}