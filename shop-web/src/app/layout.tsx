import { Outlet } from "react-router-dom";
import { ReduxAndSessionProvider } from "../assets/shared/wrappers/combinedWrapper";




export default function Layout() {

    
    return (
        <ReduxAndSessionProvider>
            <Outlet />
        </ReduxAndSessionProvider>
    )
}