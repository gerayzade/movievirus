import fs from 'fs'
import matter from 'gray-matter'

const cwd = process.cwd()
const contentDirectory = `${cwd}/content`

export const getPostSlugs = (folder) => {
  const postFiles = fs.readdirSync(`${contentDirectory}/${folder}`)
  return postFiles.map(name => name.replace(/\.md$/, ''))
}

export const getPostBySlug = async (folder, slug, fields = [], index = -1) => {
  const fileContents = fs.readFileSync(`${contentDirectory}/${folder}/${slug}.md`, 'utf8')
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
  return Promise.all(
    getPostSlugs(folder).map(async (slug, index) => getPostBySlug(folder, slug, fields, index))
  )
}

export const getPostPaths = (folder) => ({
  paths: getPostSlugs(folder).map(slug => ({ params: { slug } })), 
  fallback: false,
})
