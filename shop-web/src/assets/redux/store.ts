import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./session/sessionReducer";
import storage from "redux-persist/lib/storage";
import { sessionType } from "../../lib/utils/types/authTypes"
import { localStorageWrapper } from "./config";

const presistConfig = {
    key:"root",
    storage:localStorageWrapper
}


const rootReducer = combineReducers({
    session:userReducer
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
    session:sessionType
}
export type AppDispatch = typeof store.dispatch