import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./session/sessionReducer";
import { sessionType } from "../../lib/utils/types/authTypes"
import { localStorageWrapper } from "./config";
import cartReducer, { CartType } from "./cart/cartReducer";

const presistConfig = {
    key:"root",
    storage:localStorageWrapper
}


const rootReducer = combineReducers({
    session:userReducer,
    cart:cartReducer
})


const persistedReducer = persistReducer(presistConfig,rootReducer)


export const store = configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMiddleware) => 
            getDefaultMiddleware({
                serializableCheck:false
            })
})


export const persistor = persistStore(store)
export type RootState = {
    session:sessionType,
    cart:CartType[]
}
export type AppDispatch = typeof store.dispatch