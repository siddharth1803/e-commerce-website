import { createSlice } from "@reduxjs/toolkit";
let initialData = JSON.parse(localStorage.getItem('cartData'))

const cartSlice = createSlice({
    name: "cart",
    initialState: initialData ? initialData : [],
    reducers: {
        addItem: (state, action) => {
            let newState = ""
            const checkItem = state.findIndex(item => item._id === action.payload._id && item.size === action.payload.size);
            if (checkItem !== -1) {
                newState = [...state];
                newState[checkItem] = {
                    ...newState[checkItem],
                    qty: parseInt(newState[checkItem].qty) + parseInt(action.payload.qty),
                    finalPrice: parseInt(newState[checkItem].finalPrice) + parseInt(action.payload.price)
                };

            } else {
                newState = [...state, action.payload];
            }
            localStorage.setItem('cartData', JSON.stringify(newState));
            return newState
        },
        removeItem: (state, action) => {
            let newState = [...state];
            newState.splice(action.payload.index, 1);
            localStorage.setItem('cartData', JSON.stringify(newState));
            return newState
        },
        emptyCart: (state, action) => {
            let newState = []
            localStorage.setItem('cartData', JSON.stringify(newState));
            return newState
        }
    }
})


export const { addItem, removeItem, emptyCart } = cartSlice.actions
export default cartSlice.reducer
