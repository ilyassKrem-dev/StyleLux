import { useState } from "react";
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";



export default function DarkMode() {
    const [darkMode,setDarkMode] = useState<boolean>(localStorage.getItem("darkMode") ? true :false)
    const handleSwitch = () => {
        if(darkMode) {
            localStorage.removeItem("darkMode")
            document.documentElement.classList.remove("dark")
            setDarkMode(false)
        } else {
            localStorage.setItem("darkMode","true");
            document.documentElement.classList.add("dark")
            setDarkMode(true)
        }
    }
    return (
        <div className="text-2xl cursor-pointer dark:text-white hover-opacity active:scale-95" onClick={handleSwitch}>
            {!darkMode?<MdOutlineDarkMode />:<MdDarkMode />}
        </div>
    )
}