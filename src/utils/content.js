import { promises as fs } from 'fs'
import matter from 'gray-matter'

const cwd = process.cwd()
const contentDirectory = `${cwd}/content`

export const getPostSlugs = async (folder) => {
  const postFiles = await fs.readdir(`${contentDirectory}/${folder}`)
  return postFiles.map(name => name.replace(/\.md$/, ''))
}

export const getPostBySlug = async (folder, slug, fields = [], index = -1) => {
  const fileContents = await fs.readFile(`${contentDirectory}/${folder}/${slug}.md`, 'utf8')
  const { data } = matter(fileContents)
  if (index !== -1) {
    data.index = index
  }
  fields = fields.length
    ? ['index', ...fields]
    : Object.keys(data)
  return fields.reduce((acc, field) => ({
    ...acc,
    [field]: data[field],
  }), { slug })
}

export const getAllPosts = async (folder, fields = []) => {
  const postSlugs = await getPostSlugs(folder)
  return await Promise.all(
    postSlugs.map(async (slug, index) => {
      const post = await getPostBySlug(folder, slug, fields, index)
      return post
    })
  )
}

export const getPostPaths = async (folder) => {
  const postSlugs = await getPostSlugs(folder)
  return {
    paths: postSlugs.map(slug => ({ params: { slug } })), 
    fallback: false,
  }
}
