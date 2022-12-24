import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

const postsEndpoint = `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`
const postType = 'facts'

export const getAllFacts = createAsyncThunk('facts/getAllFacts', async () => {
  try {
    const { data } = await axios.get(`${postsEndpoint}`, {
      params: {
        postType,
      },
    })
    return data
  } catch (error) {
    throw error
  }
})

export const getFactBySlug = createAsyncThunk('facts/getFactBySlug', async ({ slug }) => {
  try {
    const { data } = await axios.get(`${postsEndpoint}/${slug}`, {
      params: {
        postType,
      },
    })
    return data
  } catch (error) {
    throw error
  }
})
