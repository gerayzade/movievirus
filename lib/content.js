import fs from 'fs';
import matter from 'gray-matter';
import { toTitleCase } from './strings';

String.prototype.toTitleCase = toTitleCase;

const cwd = process.cwd();
const contentDirectory = `${cwd}/content`;

export const getPostSlugs = (folder) => (
  fs.readdirSync(`${contentDirectory}/${folder}`).map(name => name.replace(/\.md$/, ''))
)

export const getPostBySlug = async (folder, slug, fields = [], i = -1) => {
  const fileContents = fs.readFileSync(`${contentDirectory}/${folder}/${slug}.md`, 'utf8');
  const { data } = matter(fileContents);
  data.title = data.title.toTitleCase();
  i !== -1 && (() => (data.i = i))();
  fields = fields.length ? ['i',...fields] : Object.keys(data);
  return fields.reduce((acc, field) => ({ ...acc, [field]: data[field] }), { slug: slug });
}

export const getAllPosts = async (folder, fields = []) => Promise.all(
  getPostSlugs(folder).map(async (slug, i) => getPostBySlug(folder, slug, fields, i))
)

export const getPostPaths = (folder) => ({
  paths: getPostSlugs(folder).map(slug => ({ params: { slug: slug } })), 
  fallback: false
})