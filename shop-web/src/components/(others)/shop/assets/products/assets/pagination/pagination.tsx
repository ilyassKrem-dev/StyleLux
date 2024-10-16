import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"



export default function Pagination({maxPages}:{
    maxPages:number
}) {
    const [searchParams,setSearchParams] = useSearchParams()
    const [pages,setPages] = useState<number[]>([])
    const [pageSelected,setPageSelected] = useState<number>(1)

    const updataPages = (selected:number) => {
        const start = Math.max(selected-1,1)
        const end = Math.min(start+2,maxPages)
        const newPages = Array.from({length:end-start+1},(_,index) => start+index)
        setPages(newPages)
    }
    const handleClick = (number:number) => {
        setPageSelected(number)
        const params = Object.fromEntries(searchParams)
        setSearchParams({...params,page:number.toString()})

    }
    useEffect(() => {
        updataPages(pageSelected)
       
    },[maxPages,pageSelected])
    return (
        <div className="mt-5">
            <div className="flex gap-4 items-center justify-center">
                {pages.map((page,index) => {
                    return (
                        <div key={index} 
                        className={`cursor-pointer rounded-full p-3 text-black w-[50px] text-center ${pageSelected === page ?"bg-[#F3F3F3] " :" dark:text-white"}`}
                        onClick={() =>handleClick(page)}
                        >
                            {page}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}