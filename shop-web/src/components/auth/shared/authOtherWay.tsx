
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import { signUpType } from "../../../lib/utils/types/authTypes";
import { generateSecureRandomCode } from "../../../lib/utils/random/random";
import { useDispatch } from "react-redux";
import Auth from "../../../lib/api/auth/Auth";
import { setSession } from "../../../assets/redux/session/sessionReducer";
import { useNavigate, useSearchParams } from "react-router-dom";



export default function AuthOtherWay({
    path
}:{
    path:string
}) {
    const [searchParams] = useSearchParams()
    const dispatch = useDispatch()
    const route = useNavigate()
    const googleLogin = useGoogleLogin({
        onSuccess: async (res) => {
            const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json`, {
                headers: {
                    Authorization: `Bearer ${res.access_token}`,
                },
            });
            const userInfo = await response.json();
            const data = {
                firstname:userInfo.given_name,
                lastname:userInfo.family_name,
                email:userInfo.email,
                password:userInfo.id,
                type:"google",
                number:"",
                con_password:""
            }
            handleSign(data)
        },
        onError:(res) => console.log(res),
        scope:"profile email"
    })
    const handleSign = async(data:signUpType) => {
        const res = await Auth.signUp(data)
        if(res?.success) {
            dispatch(setSession(res.data as any))
            const redirect = searchParams.get("to");
            if(redirect) {
                route(redirect)
            } else {
                route("/")
            }
        }
    }
    
    return (
        <div className="flex gap-3 flex-col max-[654px]:justify-center max-[654px]:items-center">
            {path=="/logni"?
            <h3 className=" font-volkhov text-xl font-semibold capitalize dark:text-white">Sign in to Shop</h3>
            :
            <h3 className=" font-poppins text-xl font-semibold capitalize dark:text-white">Create Account</h3>}
            <div className="flex justify-center items-center font-poppins">
                <div className="px-3 p-2 rounded-md border border-blue-300/40 flex items-center gap-2 hover:bg-black/5 cursor-pointer transition-all duration-300 dark:hover:bg-white/50 dark:bg-white " onClick={() =>  googleLogin()}>
                    <div className="text-2xl">
                        <FcGoogle/>
                    </div>
                    <p className=" cursor-pointer text-sm dark:text-black">Sign up with Google</p>
                </div>
            </div>
        </div>
    )
}