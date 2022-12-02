import { createAsyncThunk } from '@reduxjs/toolkit'
import contentAPI from '~/utils/content'

export const getAllFacts = createAsyncThunk('facts/getAllFacts', async () => {
  const data = await contentAPI.getAllPosts({
    postType: 'facts',
    fields: ['title', 'image'],
  })
  return data
})

export const getFactBySlug = createAsyncThunk('facts/getFactBySlug', async ({ slug }) => {
  const data = await contentAPI.getPostBySlug({
    postType: 'facts',
    slug,
  })
  return data
})
