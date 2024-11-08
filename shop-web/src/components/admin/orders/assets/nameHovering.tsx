import { useEffect, useState } from "react"
import Orders from "../../../../lib/api/admin/orders/Orders";
import { Link } from "react-router-dom";


type SimpleUserType = {
    id:number;
    uid:string;
    firstName:string;
    lastName:string;
    email:String;
    number:string
}


export default function NameHovering({userId}:{
    userId:number
}) {
    const [user,setUser] = useState<SimpleUserType|undefined>(undefined)
    useEffect(() => {
            const getSimpleInfo = async() => {
                const res= await Orders.getSimpleUser(userId)
                if(res?.success) {
                    setUser(res.data)
                }
            }
            getSimpleInfo()
    },[userId])
    return (
        <>
            {user&&
            <div className=" absolute bottom-5 bg-white dark:bg-dark rounded-md border border-black/10 dark:border-white/10 shadow-sm p-2 z-30 w-[200px]" onMouseEnter={(e) => e.stopPropagation()}>
                <div className="flex flex-col items-start">
                    <div className="flex gap-2 flex-wrap capitalize text-start font-medium dark:text-white">
                        <p>{user.firstName}</p>
                        <p>{user.lastName}</p>
                    </div>
                    <p className="text-sm text-black/70 dark:text-white/70">{user.email}</p>
                    <p className="text-sm text-black/70 dark:text-white/70">{user.number}</p>
                    <Link to={`/admin/users/${user.id}`}
                    target="_blank" 
                    className="mt-3 w-full">
                        <button className="rounded-md py-2 px-2 text-white bg-black dark:bg-white dark:text-dark active:scale-95 hover:bg-dark/70 hover:dark:bg-white/70 transition-all duration-300 font-semibold text-sm w-full">
                            View
                        </button>
                    </Link>
                </div>
            </div>   
            }
        </>
    )
}