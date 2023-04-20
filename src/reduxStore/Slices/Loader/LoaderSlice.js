import { createSlice } from '@reduxjs/toolkit'

export const LoaderSlice = createSlice({
  name: 'loaderSlice',
  initialState: { loading: false },
  reducers: {
    setLoading: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.loading = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setLoading } = LoaderSlice.actions

export default LoaderSlice.reducer