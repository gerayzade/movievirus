import axios from 'axios'
import merge from 'lodash/merge'
import { createAsyncThunk } from '@reduxjs/toolkit'

const postsEndpoint = `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`

export const getSearchResults = createAsyncThunk('search/getSearchResults', async (params = {}, thunkAPI) => {
  const { data } = await axios.get(`${postsEndpoint}`, {
    params: merge({
      limit: 20,
      select: 'slug,title',
    }, params),
  })

  if (params.append) {
    const state = thunkAPI.getState()
    const loadedEntries = state.search.result.entries || []
    return {
      ...data,
      entries: [
        ...loadedEntries,
        ...data.entries,
      ],
    }
  }

  return data
})
