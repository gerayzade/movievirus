import fs from 'fs'
import matter from 'gray-matter'

const cwd = process.cwd()
const contentDir = `${cwd}/content`

const getPostSlugs = ({ postType }) => {
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

export const findPostBySlug = ({
  fields = [],
  postType = 'facts',
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

export const findAllPosts = ({
  fields = ['image', 'tags', 'title'],
  postType = 'facts',
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const postSlugs = await getPostSlugs({ postType })
      const posts = await Promise.all(
        postSlugs.map(async (slug) => {
          const post = await findPostBySlug({
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

const contentCtrl = {
  findAllPosts,
  findPostBySlug,
}

export default contentCtrl
