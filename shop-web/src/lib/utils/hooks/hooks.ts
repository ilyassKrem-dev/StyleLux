import { SetStateAction, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../../assets/redux/store"
import { CartItemsType } from "../types/cartType"
import Cart from "../../api/product/cart/Cart"





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


export const useCartItems = () : [CartItemsType[],React.Dispatch<SetStateAction<CartItemsType[]>>] => {
    const itemsId = useSelector((state:RootState) => state.cart)
    const [items,setItems] = useState<CartItemsType[]>([])
    useEffect(() => {
        const getItems = async() => {
            const res= await Cart.getCartProducts(itemsId)
            if(res?.success) return setItems(res.data)
        }
        getItems()
    },[])
    return [items,setItems];
}


export const useTitle = (title:string) : void => {
    useEffect(() => {
        document.title = title
    },[title])
}