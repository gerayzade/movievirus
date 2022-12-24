import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

const postsEndpoint = `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`

export const getAllPosts = createAsyncThunk('posts/getAllPosts', async () => {
  const { data } = await axios.get(`${postsEndpoint}`)
  return data
})

export const getPostBySlug = createAsyncThunk('posts/getPostBySlug', async ({ slug }) => {
  const { data } = await axios.get(`${postsEndpoint}/${slug}`)
  return data
})
