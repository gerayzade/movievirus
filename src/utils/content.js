import { promises as fs } from 'fs'
import matter from 'gray-matter'

const cwd = process.cwd()
const contentDir = `${cwd}/content`

export const getPostSlugs = async ({ postType }) => {
  const dirPath = `${contentDir}/${postType}`
  const postFiles = await fs.readdir(dirPath)
  return postFiles.map(name => name.replace(/\.md$/, ''))
}

export const getPostBySlug = async ({
  fields = [],
  postType,
  slug,
}) => {
  const filePath = `${contentDir}/${postType}/${slug}.md`
  const fileContents = await fs.readFile(filePath, 'utf8')
  const { data } = matter(fileContents)
  return fields.length
    ? fields.reduce((acc, key) => ({
      ...acc,
      [key]: data[key],
    }), { slug }) 
    : {
      ...data,
      slug,
    }
}

export const getAllPosts = async ({
  fields = [],
  postType,
}) => {
  const postSlugs = await getPostSlugs({ postType })
  return await Promise.all(
    postSlugs.map(async (slug) => {
      const post = await getPostBySlug({
        fields,
        postType,
        slug,
      })
      return post
    })
  )
}

export const getPostPaths = async ({ postType }) => {
  const postSlugs = await getPostSlugs({ postType })
  return postSlugs.map(slug => ({
    params: {
      slug,
    },
  }))
}

const contentAPI = {
  getAllPosts,
  getPostBySlug,
  getPostPaths,
}

export default contentAPI
