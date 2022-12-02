import { promises as fs } from 'fs'
import matter from 'gray-matter'

const cwd = process.cwd()
const contentDir = `${cwd}/content`

export const getPostSlugs = async (postType) => {
  const dirPath = `${contentDir}/${postType}`
  const postFiles = await fs.readdir(dirPath)
  return postFiles
    .map(name => name.replace(/\.md$/, ''))
}

export const getPostBySlug = async (postType, slug, fields = [], index = -1) => {
  const filePath = `${contentDir}/${postType}/${slug}.md`
  const fileContents = await fs.readFile(filePath, 'utf8')
  const { data } = matter(fileContents)
  if (index !== -1) {
    data.index = index
  }
  fields = fields.length
    ? ['index', ...fields]
    : Object.keys(data)
  return fields
    .reduce((acc, field) => ({
      ...acc,
      [field]: data[field],
    }), { slug })
}

export const getAllPosts = async (postType, fields = []) => {
  const postSlugs = await getPostSlugs(postType)
  return await Promise.all(
    postSlugs
      .map(async (slug, index) => {
        const post = await getPostBySlug(postType, slug, fields, index)
        return post
      })
  )
}

export const getPostPaths = async ({ postType }) => {
  const postSlugs = await getPostSlugs(postType)
  return postSlugs
    .map(slug => ({
      params: { slug },
    }))
}

const contentAPI = {
  getAllPosts,
  getPostBySlug,
  getPostPaths,
}

export default contentAPI
