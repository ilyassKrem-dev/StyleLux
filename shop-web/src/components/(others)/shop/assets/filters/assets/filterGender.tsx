import { SetURLSearchParams } from "react-router-dom";



export default function FilterGender({searchParams,setSearchParams,isOverlay}:{
    searchParams:URLSearchParams;
    setSearchParams:SetURLSearchParams;
    isOverlay?:boolean
}) {
    const genderParams = searchParams.get("gender")
    const handleGenderClick = (gender:string) => {
        const params = Object.fromEntries(searchParams)
        if(genderParams === gender) {
            delete params.gender
        } else{
            params.gender = gender
        }
        setSearchParams({...params})
    }

    return (
        <div className={`flex flex-col gap-3 ${isOverlay ? " justify-center items-center":""}`}>
                <h4 className={`font-volkhov text-lg dark:text-lighter ${isOverlay ? "text-xl":""}`}>Gender</h4>
                <div className={`flex gap-2 max-w-[150px] flex-col  ${isOverlay ?"text-xl items-center" :"text-sm"}`}>
                <p className={`text-[#8A8A8A] cursor-pointer border-[#8A8A8A] w-fit rounded-full py-1 px-4 hover:bg-gray-300/70 active:scale-95 transition-all duration-300 dark:text-light dark:hover:bg-white/70 ${genderParams === "m" ?"bg-gray-300/70 dark:bg-white/70" :""}`} onClick={() => handleGenderClick("m")}>Male</p>
                <p className={`text-[#8A8A8A] cursor-pointer border-[#8A8A8A] w-fit rounded-full py-1 px-4 hover:bg-gray-300/70 active:scale-95 transition-all duration-300 dark:text-light dark:hover:bg-white/70 ${genderParams === "f" ?"bg-gray-300/70 dark:bg-white/70" :""}`} onClick={() => handleGenderClick("f")}>Female</p>
            </div>
        </div>
    )
}