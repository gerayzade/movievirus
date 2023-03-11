import { camelCase } from '~/utils'

export const transformEntry = entry => ({
  id: entry.sys.id,
  createdAt: entry.sys.createdAt,
  ...entry.fields,
  featuredImage: entry.fields.featuredImage && {
    src: entry.fields.featuredImage.fields.file.url,
    title: entry.fields.featuredImage.fields.title,
  },
})

export const transformTags = tags => tags.map(tag => tag.name)

export const transformQuery = ({
  ids,
  limit = 10,
  order = '-sys.createdAt',
  skip = 0,
  searchQuery,
  select,
  slug,
  tags,
}) => {
  const query = { limit, order, skip }

  ids && (query['sys.id[in]'] = ids)
  searchQuery && (query['fields.title[match]'] = searchQuery)
  select && (query['select'] = select.replace(/[^,]+/g, 'fields.$&'))
  slug && (query['fields.slug[equals]'] = slug)
  tags && (query['metadata.tags.sys.id[all]'] = camelCase(tags))

  return query
}
