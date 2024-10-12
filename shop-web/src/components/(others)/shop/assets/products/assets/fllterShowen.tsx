import { useState } from "react"
import { IoIosArrowDown } from "react-icons/io"




export default function FilterShowen() {

    const [show,setShow] = useState<boolean>(false)
    
    return (
        <>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-1 cursor-pointer font-medium dark:text-light" onClick={() => setShow(prev => !prev)}>
                    <p className=" font-volkhov text-base cursor-pointer">Best selling</p>
                    <div className="">
                        <IoIosArrowDown />
                    </div>
                </div>
            </div>
        </>
    )
}