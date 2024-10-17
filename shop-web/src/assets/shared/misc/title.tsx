import { IoIosArrowBack } from "react-icons/io"



export default function Title({title,link}:{
    title:string,
    link:string
}) {

    return (
        <div className="flex justify-center items-center w-full flex-col gap-3">
            <h1 className="font-bold text-4xl font-volkhov dark:text-white">{title}</h1>
            <div className="flex gap-5 items-center dark:text-light">
                <p className=" font-medium">Home</p>
                <span className=" rotate-180 text-sm"><IoIosArrowBack /></span>
                <p className=" font-medium">{link}</p>
            </div>
        </div>
    )
}