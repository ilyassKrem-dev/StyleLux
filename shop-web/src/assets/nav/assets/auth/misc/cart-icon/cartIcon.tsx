import { useState } from "react";
import { IoBagOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";
import ReactDOM from "react-dom";
import CartItems from "./cartItems";
import { AnimatePresence } from "framer-motion";



export default function CartIcon() {
    const [show,setShow] = useState<boolean>(false)
    const cartLength = useSelector((state:RootState) => state.cart).length
    return (
        <>
            <div className="text-xl active:scale-95 cursor-pointer hover-opacity dark:text-white relative font-poppins" onClick={() => setShow(true)}>
                <IoBagOutline />
                {cartLength>0&&
                <div className="absolute text-xs bottom-2 -right-2 border rounded-full w-[20px] text-center dark:bg-black dark:text-white h-[20px] bg-white text-black flex justify-center items-center">
                    {cartLength > 9 ? "9+":cartLength}
                </div>}
            </div>
            {ReactDOM.createPortal(
            <AnimatePresence>
                {show&&<CartItems setShow={setShow}/>}
                
            </AnimatePresence>,
            document.body)}
        
        </>
    )
}