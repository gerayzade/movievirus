import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import reducer from '~/store/slices'
import { isDev } from '~/utils'

const makeStore = () => configureStore({
  reducer,
  devTools: isDev(),
})

export const wrapper = createWrapper(makeStore)
