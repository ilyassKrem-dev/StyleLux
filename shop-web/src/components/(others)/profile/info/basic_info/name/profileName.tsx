import { ChangeEvent, useEffect, useRef, useState } from "react"
import { useSession } from "../../../../../../assets/shared/wrappers/SessionWrapper";
import { motion } from "framer-motion";
import { useTitle } from "../../../../../../lib/utils/hooks/hooks";
import { useNavigate } from "react-router-dom";
import User from "../../../../../../lib/api/user/User";
import { useDispatch } from "react-redux";
import { updateSession } from "../../../../../../assets/redux/session/sessionReducer";
import LoadingAnimation from "../../../../../../assets/shared/loadingAnmation";
import UserInfo from "../../../../../../lib/api/user/UserInfo";

type FullNameType = {
    fname:string;
    lname:string;
}

export default function ProfileName() {
    const {session} = useSession()
    const router = useNavigate()
    const dispatch = useDispatch()
    const  inputRef1 = useRef<HTMLInputElement>(null)
    const  inputRef2 = useRef<HTMLInputElement>(null)
    const [fullName,setFullName] = useState<FullNameType>(
        {
            fname:session.firstname,lname:session.lastname
        }
    )
    const [errors,setErrors] = useState<FullNameType>(
        {
            fname:"",lname:""
        }
    )
    const {fname,lname} = fullName

    const [clicked,setClicked] = useState<string>("")
    const [loading,setLoading] = useState<boolean>(false)


    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        const {name,value} = e.target
        setFullName(prev => ({...prev,[name]:value}))
        setErrors(prev => ({...prev,[name]:""}))
    }
    
    const disabled = (fname.length ==0 || lname.length==0)|| (fname === session.firstname && lname == session.lastname) || loading

    const handleSave = async() => {
        if(disabled) return
        setLoading(true)
        const res= await new UserInfo(session.uid).updateFullName(fullName)
        if(res?.success) {
            setLoading(false)
            dispatch(updateSession({...session,
                    firstname:fname,
                    lastname:lname}))
            router("/profile/info")
        } else {
            setLoading(false)
            setErrors(res?.errors as any)
        }
    }

    useTitle("Name")
    useEffect(() => {
        const clickCheck = (e:any) => {
            const fname = document.querySelector(".fname")
            const lname = document.querySelector(".lname")
            if(fname  && !fname?.contains(e.target) && lname && !lname.contains(e.target)) {
                setClicked("")
            }
        }   
        
        document.addEventListener("click",clickCheck)

        return () => document.removeEventListener("click",clickCheck)
    },[])
    return (
        <>
            <div className="flex justify-center items-center dark:text-white">
                <div className="flex flex-col gap-1 items-center">
                    <h1 className="font-semibold text-3xl capitalize mt-4">Name</h1>
                    
                </div>
            </div>
            <div className="mt-10 max-w-[700px] mx-auto">
                <div className="md:p-4 md:border rounded-lg md:border-black/20 md:dark:border-white/20 md:shadow-md md:px-8">
                    <p className=" text-black/80 dark:text-white/80">Here you can change your first name and last name</p>
                    <div className="flex flex-col gap-10 mt-6">
                        <div className="flex flex-col gap-1">
                            <div className="relative flex  items-center group fname" onClick={() => setClicked("fname")}>
                                <input 
                                type="text" 
                                name="fname" 
                                id="fname"
                                ref={inputRef1}
                                value={fname}
                                onChange={handleChange} 
                                className={`w-full border-[1.5px] rounded-md border-black/60 group-hover:shadow-md group-hover:border-black/80 transition-all duration-300 px-4 ${clicked=="fname"?" ring-black ring-1 dark:ring-white dark:ring-2":""} ${errors.fname ? "!ring-accent !border-accent":""}`}/>
                                <motion.div
                                onClick={() => {
                                    inputRef1.current?.focus()
                                }}
                                initial={{y:fname.length==0 ?0 :-24}} 
                                animate={{y:(fname.length==0 && clicked !== "fname") ?0 :-24}}
                                transition={{duration:0.01,type:"spring"}}
                                className={`absolute bg-white left-4 h-fit w-fit text-sm px-1 text-black/60 dark:bg-dark dark:text-white/60 group-hover:text-black/80 transition-all duration-300 ${clicked=="fname"?"!text-black dark:!text-white":""} ${errors.fname ? "!text-accent ":""}`}>
                                    First name
                                </motion.div>
                            </div>
                            <p className="text-sm text-accent">{errors.fname}</p>
                        </div>
                        <div className="relative flex  items-center group lname" onClick={() => setClicked("lname")}>
                            <input 
                            type="text" 
                            name="lname" 
                            id="lname"
                            ref={inputRef2}
                            value={lname}
                            onChange={handleChange} 
                            className={`w-full border-[1.5px] rounded-md border-black/60 group-hover:shadow-md group-hover:border-black/80 transition-all duration-300 px-4 ${clicked=="lname"?" ring-black ring-1 dark:ring-white dark:ring-2":""} ${errors.lname ? "!ring-accent !border-accent":""}`}/>
                            <motion.div
                            onClick={() => {
                                inputRef2.current?.focus()
                            }}
                            initial={{y:lname.length==0 ?0 :-24}} 
                            animate={{y:(lname.length==0 && clicked !== "lname") ?0 :-24}}
                            transition={{duration:0.01,type:"spring"}}
                            className={`absolute bg-white left-4 h-fit w-fit text-sm px-1 text-black/60 dark:bg-dark dark:text-white/60 group-hover:text-black/80 transition-all duration-300 ${clicked=="lname"?"!text-black dark:!text-white":""} ${errors.lname ? "!text-accent ":""}`}>
                                Last name
                            </motion.div>
                        </div>
                    </div>
                    <div className="mt-10 flex flex-row justify-end items-center gap-4">
                        <button onClick={() => router("/profile/info")} className=" font-semibold dark:text-white active:scale-95 rounded-full px-3 py-2 hover:bg-black/70 hover:text-white transition-all duration-300 dark:hover:text-black dark:hover:bg-white/70">
                            Cancel
                        </button>
                        <button className="rounded-full text-white bg-black px-8 py-2 font-semibold active:scale-95 dark:bg-white dark:text-black hover:bg-black/70 dark:hover:bg-white/70 transition-all duration-300 disabled:cursor-default disabled:bg-black/50 dark:disabled:bg-white/50 disabled:active:scale-100"
                        disabled={disabled}
                        onClick={handleSave} 
                        >
                            {loading?<LoadingAnimation className="!p-2"/>:"Save"}
                           
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}