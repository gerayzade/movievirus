import { createSlice } from '@reduxjs/toolkit'

export const layoutSlice = createSlice({
  name: 'layout',
  initialState: {
    isMenuOpened: false,
    searchQuery: '',
  },
  reducers: {
    setMenuState: (state, { payload }) => {
      state.isMenuOpened = payload
    },
    setSearchQuery: (state, { payload }) => {
      state.searchQuery = payload
    },
  },
})

export const {
  setMenuState,
  setSearchQuery,
} = layoutSlice.actions

export default layoutSlice.reducer
