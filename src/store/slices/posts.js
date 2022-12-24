import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import * as reduxHelper from '~/utils/redux'
import {
  getAllPosts,
  getPostBySlug,
} from '~/store/thunks'

export const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    all: [],
    single: {},
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(HYDRATE, reduxHelper.handleHydrateAction({
        sliceName: 'posts',
      }))
      .addCase(getAllPosts.fulfilled, reduxHelper.handleFulfilledAction({
        statePropKey: 'all',
      }))
      .addCase(getPostBySlug.fulfilled, reduxHelper.handleFulfilledAction({
        statePropKey: 'single',
      }))
  },
})

export default postsSlice.reducer
