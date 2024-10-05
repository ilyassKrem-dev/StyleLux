
import { FcGoogle } from "react-icons/fc";



export default function AuthOtherWay({
    path
}:{
    path:string
}) {


    return (
        <div className="flex gap-3 flex-col max-[654px]:justify-center max-[654px]:items-center">
            {path=="/logni"?
            <h3 className=" font-volkhov text-xl font-semibold capitalize">Sign in to Shop</h3>
            :
            <h3 className=" font-volkhov text-xl font-semibold capitalize">Create Account</h3>}
            <div className="flex justify-center items-center font-poppins">
                <div className="px-3 p-2 rounded-md border border-blue-300/40 flex items-center gap-2 hover:bg-black/5 cursor-pointer transition-all duration-300">
                    <div className="text-2xl">
                        <FcGoogle/>
                    </div>
                    <p className=" cursor-pointer text-sm ">Sign up with Google</p>
                </div>
            </div>
        </div>
    )
}