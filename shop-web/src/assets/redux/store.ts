// import { configureStore } from "@reduxjs/toolkit";
// import { persistStore, persistReducer } from 'redux-persist';
// import { combineReducers } from "@reduxjs/toolkit";

// import storage from "./config";

// const presistConfig = {
//     key:"root",
//     storage
// }


// const rootReducer = combineReducers({
 
// })


// const persistedReducer = persistReducer(presistConfig,rootReducer)


// export const store = configureStore({
//     reducer:persistedReducer,
//     middleware:(getDefaultMiddleware) => 
//             getDefaultMiddleware({
//                 serializableCheck:false
//             })
// })


// export const persistor = persistStore(store)
// export type RootState = {
//     darkmode:boolean
// }
// export type AppDispatch = typeof store.dispatch