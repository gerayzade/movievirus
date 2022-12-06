import fs from 'fs'
import matter from 'gray-matter'

const cwd = process.cwd()
const contentDir = `${cwd}/content`

export const getPostSlugs = ({ postType }) => {
  return new Promise((resolve, reject) => {
    try {
      const dirPath = `${contentDir}/${postType}`
      const postFiles = fs.readdirSync(dirPath)
      const postSlugs = postFiles.map(name => name.replace(/\.md$/, ''))
      resolve(postSlugs)
    } catch (error) {
      console.error(error)
      reject('Failed to get post slugs')
    }
  })
}

export const getPostBySlug = ({
  fields = [],
  postType,
  slug,
}) => {
  return new Promise((resolve, reject) => {
    try {
      const { data } = matter.read(`${contentDir}/${postType}/${slug}.md`)
      const post = fields.length
        ? fields.reduce((acc, key) => ({
          ...acc,
          [key]: data[key],
        }), { slug }) 
        : {
          ...data,
          slug,
        }
      resolve(post)
    } catch (error) {
      console.error(error)
      reject('Failed to get post by slug')
    }
  })
}

export const getAllPosts = ({
  fields = [],
  postType,
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const postSlugs = await getPostSlugs({ postType })
      const posts = await Promise.all(
        postSlugs.map(async (slug) => {
          const post = await getPostBySlug({
            fields,
            postType,
            slug,
          })
          return post
        })
      )
      resolve(posts)
    } catch (error) {
      console.error(error)
      reject('Failed to get all posts')
    }
  })
}

export const getPostPaths = async ({ postType }) => {
  try {
    const postSlugs = await getPostSlugs({ postType })
    return postSlugs.map(slug => ({
      params: {
        slug,
      },
    }))
  } catch (error) {
    console.error(error)
    return []
  }
}

const contentAPI = {
  getAllPosts,
  getPostBySlug,
  getPostPaths,
}

export default contentAPI
