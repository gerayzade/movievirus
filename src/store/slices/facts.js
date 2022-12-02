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
    payloadType: null,
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllFacts.fulfilled, (state, { payload }) => {
        state.all = payload
        state.payloadType = 'all'
      })
      .addCase(getFactBySlug.fulfilled, (state, { payload }) => {
        state.single = payload
        state.payloadType = 'single'
      })
      .addCase(HYDRATE, reduxHelper.handleHydrateAction({
        sliceName: 'facts',
      }))
  },
})

export default factsSlice.reducer
