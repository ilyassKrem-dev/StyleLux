
import { useTitle } from "../../lib/utils/hooks/hooks";
import BottomHome from "./assets/bottomHome";
import HomeDeals from "./assets/homeDeals/homeDeals";
import TopHome from "./assets/topHome";


export default function Home() {
    
    useTitle("Shop")
    return (
        <div className="flex flex-col py-20 sm:py-28 max-w-[1200px] mx-auto relative">
            <TopHome />
            <HomeDeals />
            <BottomHome />
        </div>
    )
}