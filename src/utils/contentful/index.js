import * as contentful from 'contentful'
import {
  transformEntry,
  transformTags,
  transformQuery,
} from '~/utils/contentful/helpers'

const {
  CONTENTFUL_ACCESS_TOKEN,
  CONTENTFUL_ENV,
  CONTENTFUL_SPACE_ID,
} = process.env

const client = contentful.createClient({
  accessToken: CONTENTFUL_ACCESS_TOKEN,
  environment: CONTENTFUL_ENV,
  space: CONTENTFUL_SPACE_ID,
})

const PAGE_LIMIT = 36

const getTags = async (query = {}) => {
  const response = await client.getTags({
    ...transformQuery(query),
  })

  const tags = response.items

  return transformTags(tags)
}

const getEntries = async (contentType, query = {}) => {
  const response = await client.getEntries({
    content_type: contentType,
    limit: PAGE_LIMIT,
    ...transformQuery(query),
  })

  const entries = response.items

  return entries.map(entry => transformEntry(entry))
}

const getEntry = async (contentType, query = {}) => {
  const response = await client.getEntries({
    content_type: contentType,
    limit: 1,
    ...transformQuery(query),
  })

  const entry = response.items[0]

  if (!entry) {
    throw new Error('Entry not found')
  }

  const tagIds = entry.metadata.tags
    .map(tag => tag.sys.id)
    .join(',')
  const tags = await getTags({
    ids: tagIds,
  })

  return {
    ...transformEntry(entry),
    tags,
  }
}

const contentfulService = {
  getEntries,
  getEntry,
}

export default contentfulService
