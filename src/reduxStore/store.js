import { configureStore } from '@reduxjs/toolkit'
import CartSlice from './Slices/Cart/CartSlice'
import LoaderSlice from './Slices/Loader/LoaderSlice'

export const store = configureStore({
  reducer: {
    cart: CartSlice,
    loading: LoaderSlice,
  },
})