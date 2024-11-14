import { useEffect, useState } from "react";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { useSearchParams } from "react-router-dom";




export default function AdminPagination({maxPage}:{
    maxPage:number
}) {
    const [searchParams,setSearchParam] = useSearchParams()
    const currentPage = Number(searchParams.get("page"))
    
    const [pages,setPages] = useState<number[]>([])

    const [pageSelected,setPageSelected] = useState<number>(currentPage ?(currentPage > maxPage ? maxPage : currentPage) : 1)

    const updatePage = (selected:number) => {
        const startPages = Math.max(selected-1,1)
        const endPages = Math.min(startPages+2,maxPage)
        const arrayOfnumbers = Array.from({length: endPages-startPages+1},(_,index) => startPages+index)
        setPages(arrayOfnumbers)
    }

    const handleClick = (page:number) => {
        setPageSelected(page)
        const params = Object.fromEntries(searchParams)
        setSearchParam({...params,page:page.toString()})
    }

    useEffect(() => {
        updatePage(pageSelected)
    },[maxPage,pageSelected])
    return (
        <>
            <div className="flex items-center gap-2 dark:text-white">
                <div className=" flex items-center text-2xl gap-2">
                    <div onClick={() => handleClick(1)} className=" hover-opacity active:scale-95 cursor-pointer">
                        <MdOutlineKeyboardDoubleArrowLeft />
                    </div>
                    <div onClick={() => handleClick(Math.max(pageSelected - 1,1))} className=" hover-opacity active:scale-95 cursor-pointer">
                        <MdOutlineKeyboardArrowLeft />
                    </div>
                </div>
                <div className="flex items-center gap-1">
                        {pages.map((page,index) => {
                            return (
                                <div key={index} onClick={() => handleClick(page)} className={`cursor-pointer rounded-md p-1 px-2 ${page == pageSelected ? "text-white bg-black dark:text-black dark:bg-white":" hover:bg-black/40 hover:text-white/60 transition-all duration-300 dark:hover:bg-white/40 dark:hover:text-black/60"}`}>
                                    {page}
                                </div>
                            )
                        })}
                </div>
                <div className=" flex items-center text-2xl gap-2">
                    <div onClick={() => handleClick(Math.min(pageSelected+1,maxPage))} className=" hover-opacity active:scale-95 cursor-pointer rotate-180">
                        <MdOutlineKeyboardArrowLeft />
                    </div>
                    <div onClick={() => handleClick(maxPage)} className=" hover-opacity active:scale-95 cursor-pointer rotate-180">
                        <MdOutlineKeyboardDoubleArrowLeft />
                    </div>
                    
                </div>
            </div>
        </>
    )
}