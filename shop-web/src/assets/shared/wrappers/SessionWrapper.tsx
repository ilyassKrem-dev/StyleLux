import { useContext,createContext, useState, useEffect} from "react";
import { sessionType } from "../../../lib/utils/types/authTypes";
import {  useDispatch, useSelector } from "react-redux";
import { RootState,} from "../../redux/store";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import { removeSession } from "../../redux/session/sessionReducer";


type ContextType = {
    session:sessionType
}

const sessionContext = createContext<ContextType|null>(null)
const pathnames = ["/","/shop","/products"]
const dynamicPathsProducts = [/^\/(products|auth)\/[^\/]+$/];

export const useSession = () => {
    const context = useContext(sessionContext)
    if(!context) {
        throw new Error(`Provide a session provider`)
    }
    return context
}

const matchesDynamicPath = (path: string) => {
    return dynamicPathsProducts.some(pattern => pattern.test(path));
};

export const SessionProvider = ({children}:{
    children:React.ReactNode
}) => {
    const session = useSelector((state:RootState) => state.session) 
    const [loading,setLoading] = useState<boolean>(true)
    const pathname = useLocation().pathname
    const router = useNavigate()
    const dispatch = useDispatch()
    const cookies = Cookies.get("authToken")
    useEffect(() => {
        if(!cookies) {
            //@ts-ignore
            dispatch(removeSession())
        }
        
        if(!session && !pathnames.includes(pathname) && !matchesDynamicPath(pathname)) {
            router("/auth/login?to="+`${encodeURIComponent(pathname)}`)   
            setLoading(false)
        }
        setLoading(false)
    },[loading,pathname,session,dispatch,cookies])
    return(
        <sessionContext.Provider value={{session}}>
            {!loading&&children}
        </sessionContext.Provider>
    )
}