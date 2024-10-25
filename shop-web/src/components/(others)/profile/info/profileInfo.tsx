import { useSession } from "../../../../assets/shared/wrappers/SessionWrapper";
import BasicInfo from "./basic_info/BasicInfo";
import { useEffect, useState } from "react";
import User from "../../../../lib/api/user/User";
import { useTitle } from "../../../../lib/utils/hooks/hooks";
import { userType } from "../../../../lib/utils/types/userTypes";
import ProfileAddresses from "./addresses/profileAddresses";




export default function ProfileInfo() {
    const [userInfo,setUserInfo] = useState<userType |null>(null)
    const {session} = useSession()
    
    useEffect(() => {
        const getUserDetails = async() => {
            const res = await new User(session.uid).getUser();
            if(res?.success) {
                setUserInfo(res.data as any)
            }

        }
        getUserDetails()
    },[session])
    
    useTitle("Personal info")
    return (
        <div className="max-w-[900px] mx-auto pt-8 flex-1">
            <div className="flex justify-center items-center dark:text-white">
                <div className="flex flex-col gap-1 items-center">
                    <h1 className="font-semibold text-2xl capitalize">Personal info</h1>
                    <p>Informations about your profile</p>
                </div>
            </div>
            {userInfo&&<div className="mt-4">
                <div className="flex flex-col gap-7">
                    <BasicInfo 
                    firstName={userInfo.firstName}
                    lastName={userInfo.lastName}
                    email={userInfo.email}
                    number={userInfo.number}/>
                    <ProfileAddresses 
                    addresses={userInfo.addresses}/>
                </div>
            </div>}
        </div>
    )
}