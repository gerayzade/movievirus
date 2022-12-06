import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import * as reduxHelper from '~/utils/redux'
import {
  getAllFacts,
  getFactBySlug,
} from '~/store/thunks'

export const factsSlice = createSlice({
  name: 'facts',
  initialState: {
    all: [],
    single: {},
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(HYDRATE, reduxHelper.handleHydrateAction({
        sliceName: 'facts',
      }))
      .addCase(getAllFacts.fulfilled, reduxHelper.handleFulfilledAction({
        statePropKey: 'all',
      }))
      .addCase(getFactBySlug.fulfilled, reduxHelper.handleFulfilledAction({
        statePropKey: 'single',
      }))
  },
})

export default factsSlice.reducer
