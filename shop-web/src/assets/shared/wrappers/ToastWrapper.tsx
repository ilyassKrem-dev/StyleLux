import { createContext, useContext, useEffect, useState } from "react"
import ReactDOM from "react-dom"
import { FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";





type ToastContextType = {
    toast:(arg:valuesType) => void
}
type valuesType = {
    varient:"success"|"error",
    desc:string
}

const toastContext = createContext<ToastContextType|null>(null)


export const useToast = () => {
    const context = useContext(toastContext)
    if(!context) throw new Error(`Component must be wrapped by toast wrapper to use toast`)

    return context
}


export const ToastWrapper = ({children}:{
    children:React.ReactNode
}) => {
    const [show,setShow] = useState<boolean>(false)
    const [time,setTime] = useState<number>(15)
    const [values,setValues] = useState<valuesType>()
    const toast = ({varient,desc}:valuesType) => {
        setValues({
            varient,
            desc
        })
        setShow(true)
    }
    useEffect(() => {
        if(!show)return
        const id = setInterval(() => {
            if(time === 0) {
                setShow(false)
                return setTime(0)
            }
            setTime(prev => prev-1)
        },1000)

        return () => clearTimeout(id)
    },[time,show])
    return (
        <toastContext.Provider value={{toast}}>
            {values&&show&&ReactDOM.createPortal(
                <div className="fixed top-3 right-3 z-[99999]">
                    <div className=" bg-white dark:bg-black border border-black/60 dark:border-white/60 rounded-md flex flex-col w-[300px] relative">
                        <div className="p-2 flex items-center justify-between text-black/80 dark:text-white border-b border-black/40 dark:border-white/40">
                            <div className="flex items-center gap-3">
                                <div className={`${values?.varient === "success" ?"text-sm " :" text-xl"}`}>
                                    {values?.varient === "success"?<FaCheck />:<RxCross2 />}
                                </div>
                                <p>{values?.varient === "success"?"Success":"Error"}</p>
                            </div>
                            <div className=" active:scale-95 text-lg border rounded-full p-[0.2rem] hover-opacity cursor-pointer dark:border-white/30" onClick={() => setShow(false)}>
                                <RxCross2 />
                            </div>
                        </div>
                        <div className="p-2 text-sm dark:text-white">
                            {values?.desc}
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 h-[4px] bg-black rounded-b-md dark:bg-white" style={{
                            width:`${(time/15)*100}%`
                        }}>

                        </div>
                    </div>
                </div>
                ,document.body)}
            {children}
        </toastContext.Provider>
    )
}
