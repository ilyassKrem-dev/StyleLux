import { useState } from "react"
import { IoIosArrowDown } from "react-icons/io"
import { useSize } from "../../../../../../lib/utils/hooks/hooks";
import { useSearchParams } from "react-router-dom";
import FilterSmallS from "./misc/filterSmS";



export default function FilterShowen() {
    const [searchParams,setSearchParams] = useSearchParams()
    const [show,setShow] = useState<boolean>(false)
    const {w} = useSize()
    return (
        <>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-1 cursor-pointer font-medium dark:text-light" onClick={() => setShow(prev => !prev)}>
                    <p className=" font-volkhov sm:text-lg text-base cursor-pointer">Best selling</p>
                    <div className="">
                        <IoIosArrowDown />
                    </div>
                </div>
                {w<=785&&<FilterSmallS 
                searchParams={searchParams}
                setSearchParams={setSearchParams}/>}
            </div>
            
        </>
    )
}