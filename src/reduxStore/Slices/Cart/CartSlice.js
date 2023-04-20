import { createSlice } from '@reduxjs/toolkit'

export const CartSlice = createSlice({
  name: 'cartslice',
  initialState: { cart:[]},
  reducers: {
    setCart: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.cart.push(action.payload)
      // save cart to local storage
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    setCartFromLocalStorage: (state, action) => {
      state.cart = action.payload;
    },
    deleteFromCart: (state, action) => {
      state.cart.splice(action.payload, 1);
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
  },
})

// Action creators are generated for each case reducer function
export const { setCart, deleteFromCart } = CartSlice.actions

export default CartSlice.reducer