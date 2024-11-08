
import { useSession } from "../../../assets/shared/wrappers/SessionWrapper";
import TopDashboard from "./assets/topDashboard";
import DashGraph from "./summery/dashGraph";
import DashSummery from "./summery/dashSummery";
import DashTopProducts from "./summery/dashTopProfucts";


export default function Dashboard() {
    const {session} = useSession()
    return (
        <div className="flex flex-col gap-4 pt-32 lg:pt-12 flex-1 px-4 max-w-[1200px] mx-auto">
            <TopDashboard />
            <DashSummery session={session}/>
            <div className="flex gap-4 lg:flex-row flex-col lg:gap-2">
                <DashGraph session={session}/>
                <DashTopProducts session={session}/>
            </div>
        </div>
    )
}