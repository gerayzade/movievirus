import axios from 'axios'
import merge from 'lodash/merge'
import { createAsyncThunk } from '@reduxjs/toolkit'

const postsEndpoint = `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`

export const getSearchResults = createAsyncThunk('search/getSearchResults', async (params = {}) => {
  const { data } = await axios.get(`${postsEndpoint}`, {
    params: merge({
      search: params.searchQuery,
      select: 'slug,title',
    }, params),
  })
  return data
})
