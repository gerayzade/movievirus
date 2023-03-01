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
    result: {
      entries: [],
      total: 0,
    },
    query: '',
  },
  reducers: {
    clearSearchResults: (state) => {
      state.result.entries = []
      state.result.total = 0
    },
    setSearchLoading: (state, { payload }) => {
      state.loading = payload
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
        statePropKey: 'result',
      }))
  },
})

export const {
  clearSearchResults,
  setSearchLoading,
  setSearchQuery,
} = searchSlice.actions

export default searchSlice.reducer
