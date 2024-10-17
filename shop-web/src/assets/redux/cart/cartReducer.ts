

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type CartType = {
    uid:string;
    quantity :number;
    maxQuantity:number;
}

const initialState:CartType[] = []




const cartReducer = createSlice({
    name:"cart",
    initialState,
    reducers:{
        addToCart :(state,action:PayloadAction<CartType>) => {
            const findItem = state.find(cart => cart.uid === action.payload.uid)
            if(findItem) {
                let {quantity,maxQuantity} = findItem
                const newQuantity = Math.min(quantity + action.payload.quantity, maxQuantity);
                const updatedItem = { ...findItem, quantity: newQuantity };
                state[state.indexOf(findItem)] = updatedItem
                return state

            }
            return [action.payload,...state]
        },
        removeFromCart: (state,action:PayloadAction<string>) => {
            return state.filter(cart => cart.uid !== action.payload)
        },
        addQuantity:(state,action:PayloadAction<{uid:string,type:"increase"|"decrease"}>) => {
            const {uid,type} = action.payload
            const findItem = state.find(cart => cart.uid === uid)
            if(!findItem) return
            if(type ==="increase") {
                findItem.quantity =  Math.min(findItem.quantity + 1 , findItem.maxQuantity);
            } else {
                findItem.quantity =  Math.max(findItem.quantity - 1 , 1);
            }
            state[state.indexOf(findItem)] = findItem
        },
        removeAll:(state) => {
            return state = []
        },
        changeMaxQuatity:(state,action:PayloadAction<{uid:string,maxQuantity:number}>) => {
            const {uid,maxQuantity} = action.payload
            const findItem = state.find(item => item.uid === uid)
            if(findItem) {
                findItem.maxQuantity = maxQuantity
                state[state.indexOf(findItem)] = findItem
            }
        }

    }
})

export const {removeAll,removeFromCart,addQuantity,addToCart,changeMaxQuatity} = cartReducer.actions

export default cartReducer.reducer