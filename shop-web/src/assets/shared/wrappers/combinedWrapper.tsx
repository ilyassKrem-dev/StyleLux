import { Provider } from "react-redux"
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from "../../redux/store";
import { SessionProvider } from "./SessionWrapper";
import LoadingFullScreen from "../loadingFullScreen";


export const ReduxAndSessionProvider = ({children}:{
    children:React.ReactNode
    }) => {

        return (
            <Provider store={store}>
                <PersistGate loading={<LoadingFullScreen />} persistor={persistor}>
                    <SessionProvider >
                        {children}
                    </SessionProvider>
                </PersistGate>
            </Provider>
        )
}