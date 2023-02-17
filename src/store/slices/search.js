import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import * as reduxHelper from '~/utils/redux'
import {
  getSearchResults,
} from '~/store/thunks'

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    loading: false,
    results: [],
    query: '',
  },
  reducers: {
    setSearchLoading: (state, { payload }) => {
      state.loading = payload
    },
    setSearchResults: (state, { payload }) => {
      state.results = payload
    },
    setSearchQuery: (state, { payload }) => {
      state.query = payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(HYDRATE, reduxHelper.handleHydrateAction({
        sliceName: 'search',
      }))
      .addCase(getSearchResults.pending, reduxHelper.handlePendingAction())
      .addCase(getSearchResults.rejected, reduxHelper.handleRejectedAction())
      .addCase(getSearchResults.fulfilled, reduxHelper.handleFulfilledAction({
        statePropKey: 'results',
      }))
  },
})

export const {
  setSearchLoading,
  setSearchResults,
  setSearchQuery,
} = searchSlice.actions

export default searchSlice.reducer
