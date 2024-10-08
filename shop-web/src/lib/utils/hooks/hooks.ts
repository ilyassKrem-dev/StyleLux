import { SetStateAction, useEffect, useState } from "react"





export const useSize = () => {

    const [size,setSize] = useState<{w:number,h:number}>({
        w:window.innerWidth,
        h:window.innerHeight
    })
    useEffect(() => {
        const setWindowSize = () => {
            setSize(prev => ({...prev,
                                    w:window.innerWidth,
                                    h:window.innerHeight}))
        }
        window.addEventListener("resize",setWindowSize)

        return () => window.removeEventListener("resize",setWindowSize)
    },[size])

    return size
}

export const useDetectScrolling = () => {
   const [isScrolling,setScrolling] = useState<boolean>(false)

   useEffect(() => {
    const scrollingDetect = () => {
        if(window.scrollY > 0 && !isScrolling) {
            setScrolling(true)
        } else if (window.scrollY === 0 && isScrolling) {
            setScrolling(false)
        }
    }
    window.addEventListener("scroll",scrollingDetect)

    return () => window.removeEventListener("scroll",scrollingDetect)
   },[isScrolling])

   return isScrolling
}

export const useOverlayRemove = ({
    tab,
    setShow
    }:{
        tab:string;
        setShow:React.Dispatch<SetStateAction<boolean>>
    }) => {
    useEffect(() => {
        const overlayCheck = (e:any) => {
            const overlay = document.querySelector(`.${tab}`)
            if(overlay && !overlay.contains(e.target)) {
                setShow(false)
            }
        }
        document.addEventListener("click",overlayCheck)
        return () => document.removeEventListener("click",overlayCheck)
    },[])
}