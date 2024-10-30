import { IoIosArrowForward } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";

interface Props {
    firstName:string;
    lastName:string;
    email:string;
    number:string;
}

export default function BasicInfo(props:Props) {
    const {firstName,lastName,email,number} = props
    const pathname = useLocation().pathname
    return (
        <div className="flex flex-col  pt-3 border rounded-lg border-black/10 dark:text-white dark:border-white/20 w-full">
            <h1 className=" font-semibold text-xl px-4">Basic info</h1>
            <div className="mt-4 flex flex-col">
                <Link to={`${pathname}/name?to=${encodeURIComponent(pathname)}`}  className="relative px-4 group cursor-pointer active:bg-black/20">
                    <div className="flex gap-10 p-3 py-5 items-center justify-between cursor-pointer">
                        <div className="flex sm:items-center flex-col sm:flex-row sm:gap-16 items-start">
                            <p className="font-medium  text-sm text-black/80 cursor-pointer w-[80px] dark:text-white/80">Full name</p>
                            <p className=" capitalize text-[1.1rem] flex-1 cursor-pointer text-black/80 dark:text-white">{firstName} {lastName}</p>
                        </div>
                        <div className="text-xl">
                            <IoIosArrowForward />
                        </div>
                    </div>
                    <div className="absolute left-0 right-0 bg-black/5 top-0 bottom-0 hidden group-hover:block transition-all duration-300 dark:hover:bg-white/5">

                    </div>
                </Link>
                <div className="relative px-4 group cursor-pointer active:bg-black/20 border-y border-black/20 dark:border-white/20 dark:active:bg-white/20">
                    <div className="flex gap-10 p-3  py-5 items-center justify-between cursor-pointer">
                        <div className="flex sm:items-center flex-col sm:flex-row sm:gap-16 items-start">
                            <p className="font-medium  text-sm text-black/80 cursor-pointer w-[80px] dark:text-white/80">Email</p>
                            <p className=" text-[1.1rem] flex-1 cursor-pointer max-[360px]:truncate max-[360px]:max-w-[150px] text-black/80 dark:text-white">{email}</p>
                        </div>
                    </div>
                    <div className="absolute left-0 right-0 bg-black/5 top-0 bottom-0 hidden group-hover:block transition-all duration-300 dark:hover:bg-white/5">

                    </div>
                </div>
                <Link to={`${pathname}/number?to=${encodeURIComponent(pathname)}`}  className="relative px-4 group cursor-pointer active:bg-black/20">
                    <div className="flex gap-10 p-3 py-5 items-center justify-between cursor-pointer">
                        <div className="flex sm:items-center flex-col sm:flex-row sm:gap-16 items-start">
                            <p className="font-medium  text-sm text-black/80 cursor-pointer w-[80px] dark:text-white/80">Number</p>
                            <p className=" text-[1.1rem] flex-1 cursor-pointer max-[360px]:truncate max-[360px]:max-w-[150px] text-black/80 dark:text-white">{number?number:"Not set"}</p>
                        </div>
                        <div className="text-xl">
                            <IoIosArrowForward />
                        </div>
                    </div>
                    <div className="absolute left-0 right-0 bg-black/5 top-0 bottom-0 hidden group-hover:block transition-all duration-300 dark:hover:bg-white/5">

                    </div>
                </Link>
            </div>
        </div>
    )
}