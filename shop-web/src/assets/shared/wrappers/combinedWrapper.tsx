import { Provider } from "react-redux"
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from "../../redux/store";
import { SessionProvider } from "./SessionWrapper";
import LoadingFullScreen from "../loadingFullScreen";
import { ToastWrapper } from "./ToastWrapper";


export const ReduxAndSessionProvider = ({children}:{
    children:React.ReactNode
    }) => {

        return (
            <ToastWrapper>
                <Provider store={store}>
                    <PersistGate loading={<LoadingFullScreen />} persistor={persistor}>
                        <SessionProvider >
                            {children}
                        </SessionProvider>
                    </PersistGate>
                </Provider>
            </ToastWrapper>
        )
}