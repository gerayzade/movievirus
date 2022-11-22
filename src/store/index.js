
import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import layoutReducer from '~/store/layoutSlice'
import { isDev } from '~/utils'

const makeStore = () => configureStore({
  reducer: {
    layout: layoutReducer,
  },
  devTools: isDev(),
})

export const wrapper = createWrapper(makeStore)
