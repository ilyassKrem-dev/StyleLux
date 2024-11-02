import { motion } from "framer-motion"
import { ChangeEvent, useRef, useState } from "react"
import { useOverlayRemove } from "../../../../../lib/utils/hooks/hooks";

interface Props {
    value:string;
    name:string;
    error:string;
    handleChange:(e:ChangeEvent<HTMLInputElement>) => void;
    placeHolder:string
}

export default function NewInput({
    value,name,error,handleChange,placeHolder
}:Props) {
    const [clicked,setClicked] = useState<boolean>(false)

    const  inputRef = useRef<HTMLInputElement>(null)
    useOverlayRemove(
        {
            tab:name,
            setShow:setClicked
        }
    )
    return( 
        <div className="flex flex-col gap-1">
            <div className={`relative flex  items-center group ${name}`} onClick={() => setClicked(true)}>
                <input 
                type="text" 
                name={name} 
                id={name}
                ref={inputRef}
                value={value}
                onChange={handleChange} 
                className={`w-full border-[1.5px] rounded-md border-black/60 group-hover:shadow-md group-hover:border-black/80 dark:group-hover:border-white/80 transition-all duration-300 px-4 ${clicked?" ring-black ring-1 dark:ring-white dark:ring-2":""} ${error ? "!ring-accent !border-accent":""}`}/>
                <motion.div
                onClick={() => {
                    inputRef.current?.focus()
                }}
                initial={{y:value?.length==0 ?0 :-24}} 
                animate={{y:(value?.length==0 && !clicked) ?0 :-24}}
                transition={{duration:0.01,type:"spring"}}
                className={`absolute bg-white left-4 h-fit w-fit text-sm px-1 text-black/60 dark:bg-dark dark:text-white/60 group-hover:text-black/80 transition-all duration-300 dark:group-hover:text-white/80 ${!clicked?"!text-black dark:!text-white":""} ${error ? "!text-accent ":""}`}>
                    {placeHolder}
                </motion.div>
            </div>
            <p className="text-sm text-accent h-[10px]">{error}</p>
        </div>
    )
}