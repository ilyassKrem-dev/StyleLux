import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { sessionType } from "../../../lib/utils/types/authTypes";


const initialState:sessionType|null = null


export const userReducer:any = createSlice({
    name:"session",
    initialState,
    reducers:{
        //@ts-ignore
        setSession:(
            state:sessionType|null,
            action:PayloadAction<sessionType>
            ) => {
          
            return state = action.payload
        },
        removeSession:(state) => {
            return state = null
        },
         //@ts-ignore
        updateSession:(state,action:PayloadAction<sessionType>) => {
            return action.payload
        }
    }
})


export const {setSession,removeSession,updateSession} = userReducer.actions

export default userReducer.reducer