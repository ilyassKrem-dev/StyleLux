
import { useSearchParams } from "react-router-dom"
import FilterCategories from "./assets/filterCategories"
import FilterGender from "./assets/filterGender"


export default function Filters() {
    const [searchParams,setSearchParams] = useSearchParams()
    return (
        <>
            <div className="flex flex-col gap-6 max-w-[300px]">
                <h1 className=" font-volkhov text-2xl mb-2 dark:text-white">Filters</h1>
                <FilterGender 
                searchParams={searchParams} 
                setSearchParams={setSearchParams}/>
                <FilterCategories 
                searchParams={searchParams}
                setSearchParams={setSearchParams}
                />
            </div>   
        </>
    )
}