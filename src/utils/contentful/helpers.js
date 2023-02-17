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
  search,
  select,
  slug,
  tags,
}) => {
  const query = {}
  ids && (query['sys.id[in]'] = ids)
  search && (query['fields.title[match]'] = search)
  select && (query['select'] = select.replace(/[^,]+/g, 'fields.$&'))
  slug && (query['fields.slug[equals]'] = slug)
  tags && (query['metadata.tags.sys.id[all]'] = camelCase(tags))
  return query
}
