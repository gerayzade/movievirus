
import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import { isDev } from '~/utils'
import layoutReducer from './layoutSlice'

const makeStore = () => configureStore({
  reducer: {
    layout: layoutReducer,
  },
  devTools: isDev(),
})

export const wrapper = createWrapper(makeStore)
