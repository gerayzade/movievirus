import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

export const layoutSlice = createSlice({
  name: 'layout',
  initialState: {
    isMenuOpened: false,
  },
  reducers: {
    menuStateUpdated: (state, { payload }) => {
      state.isMenuOpened = payload
    },
    extraReducers: {
      [HYDRATE]: (state, { payload }) => {
        return {
          ...state,
          ...payload.layout,
        }
      },
    },
  },
})

export const {
  menuStateUpdated,
} = layoutSlice.actions

export const selectMenuState = (state) => state.layout.isMenuOpened

export default layoutSlice.reducer
