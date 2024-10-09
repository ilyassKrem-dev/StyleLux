import { useState } from "react"
import { IoIosArrowDown } from "react-icons/io"



export default function Products() {
    const [show,setShow] = useState<boolean>(false)
    return (
        <div className="flex flex-col gap-2 self-start">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-1 cursor-pointer font-medium" onClick={() => setShow(prev => !prev)}>
                    <p className=" font-volkhov text-base cursor-pointer">Best selling</p>
                    <div className="">
                        <IoIosArrowDown />
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap gap-3">

            </div>
        </div>
    )
}