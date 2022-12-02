import { createSlice } from '@reduxjs/toolkit'

export const layoutSlice = createSlice({
  name: 'layout',
  initialState: {
    isMenuOpened: false,
  },
  reducers: {
    setMenuState: (state, { payload }) => {
      state.isMenuOpened = payload
    },
  },
})

export const {
  setMenuState,
} = layoutSlice.actions

export default layoutSlice.reducer
