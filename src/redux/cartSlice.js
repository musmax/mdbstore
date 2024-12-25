import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartList: [],
        total: 0,
        totalCart: 0,
    },
    reducers: {
        add(state, action){
            const updatedList = state.cartList.concat(action.payload);
            const totalPrice = state.total + action.payload.price;
            return {
                ...state,
                cartList: updatedList,
                total: totalPrice,
                totalCart: updatedList.length,
            }
        },
        remove(state, action){
            const updatedList = state.cartList.filter(item => item.id !== action.payload.id);
            const totalPrice = state.total + action.payload.price;
            return {
                ...state,
                cartList: updatedList,
                total: totalPrice,
            }
        },
        addTotal(state, action){},
    }
})

export const {add, remove} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
