import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

export const layoutSlice = createSlice({
  name: 'layout',
  initialState: {
    isMenuOpened: false,
  },
  reducers: {
    setMenuState: (state, { payload }) => {
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
  setMenuState,
} = layoutSlice.actions

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(setMenuStateAsync(true))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const setMenuStateAsync = (value) => (dispatch) => {
  setTimeout(() => {
    dispatch(setMenuState(value))
  }, 1000)
}

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.layout.isMenuOpened)`
export const selectMenuState = (state) => state.layout.isMenuOpened

export default layoutSlice.reducer
