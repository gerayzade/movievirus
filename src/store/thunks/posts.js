import axios from 'axios'
import merge from 'lodash/merge'
import omit from 'lodash/omit'
import { createAsyncThunk } from '@reduxjs/toolkit'

const postsEndpoint = `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`

export const getAllPosts = createAsyncThunk('posts/getAllPosts', async (params = {}) => {
  const { data } = await axios.get(`${postsEndpoint}`, {
    params: merge({
      select: 'featuredImage,slug,title',
    }, params),
  })
  return data
})

export const getPostBySlug = createAsyncThunk('posts/getPostBySlug', async (params = {}) => {
  const { data } = await axios.get(`${postsEndpoint}/${params.slug}`, {
    params: omit(params, ['slug']),
  })
  return data
})
