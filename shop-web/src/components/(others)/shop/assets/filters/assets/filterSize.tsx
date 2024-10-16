
import { SetURLSearchParams } from "react-router-dom";
import { sizesList } from "../../misc/filtersList"


export default function FilterSize({searchParams,setSearchParams,isOverlay}:{
    searchParams:URLSearchParams
    setSearchParams:SetURLSearchParams;
    isOverlay?:boolean
})  {
    const sizeParams = searchParams.get("size")
    const handleSizeClick = (size:string) => {
        const params = Object.fromEntries(searchParams)
        if(sizeParams === size) {
            delete params.size
        } else {
            params.size = size
        }
        setSearchParams({...params})
    }
    return (
        <div className={`flex flex-col gap-3 ${isOverlay ? " justify-center items-center":""}`}>
            <h4 className={`font-volkhov text-lg dark:text-lighter ${isOverlay ? "text-xl":""}`} >Size</h4>
            <div className={`${isOverlay ?" grid grid-cols-2 gap-5" :"max-w-[150px] flex flex-wrap items-center gap-3"}`}>
                {sizesList.map((size,index) => {
                    const checked = sizeParams == size
                    return (
                        <div key={index} className={`border border-[#8A8A8A]  text-center py-2 rounded-md text-[#8A8A8A] cursor-pointer active:scale-95 hover:bg-gray-300/70 transition-all duration-300  dark:text-light dark:hover:bg-white/70 text-sm capitalize ${checked ?"dark:bg-white/70 bg-gray-300/70":""} ${isOverlay ? " text-xl p-4":"w-[40px]"}`} onClick={() => handleSizeClick(size)}>
                            {size}
                        </div>
                    )
                })}
            </div>
        </div>  
    )
}