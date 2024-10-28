
import { GoStar } from "react-icons/go";
import Iprofile from "./misc/profileIcon";
import { IoIosSearch } from "react-icons/io";
import { useSize } from "../../../../lib/utils/hooks/hooks";
import CartIcon from "./misc/cart-icon/cartIcon";
import { Link } from "react-router-dom";



export default function UserNav() {
    const {w} = useSize()

    return (
        <div className={`flex items-center gap-4 sm:gap-7  flex-row-reverse  ${w<=699 ?"" :"flex-1 "}`}>
            <CartIcon />
            <Link to={"/profile/favorites"}>
                <div className="text-xl active:scale-95 cursor-pointer hover-opacity dark:text-white">
                    <GoStar />
                </div>
            </Link>
            {w>360&&
            <Link to="/profile">
                <div className="text-xl active:scale-95 cursor-pointer hover-opacity dark:fill-white">
                    <Iprofile />
                </div>
            </Link>
            }
            <div className="text-[1.3rem] active:scale-95 cursor-pointer hover-opacity dark:text-white">
                <IoIosSearch />
            </div>
            
        </div>
    )
}