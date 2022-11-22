import fs from 'fs'
import matter from 'gray-matter'

const cwd = process.cwd()
const contentDirectory = `${cwd}/content`

export const getPostSlugs = (folder) => (
  fs.readdirSync(`${contentDirectory}/${folder}`).map(name => name.replace(/\.md$/, ''))
)

export const getPostBySlug = async (folder, slug, fields = [], i = -1) => {
  const fileContents = fs.readFileSync(`${contentDirectory}/${folder}/${slug}.md`, 'utf8')
  const { data } = matter(fileContents)
  i !== -1 && (() => (data.i = i))()
  fields = fields.length
    ? ['i', ...fields]
    : Object.keys(data)
  return fields.reduce((acc, field) => ({
    ...acc,
    [field]: data[field],
  }), { slug })
}

export const getAllPosts = async (folder, fields = []) => Promise.all(
  getPostSlugs(folder).map(async (slug, i) => getPostBySlug(folder, slug, fields, i))
)

export const getPostPaths = (folder) => ({
  paths: getPostSlugs(folder).map(slug => ({ params: { slug } })), 
  fallback: false,
})
