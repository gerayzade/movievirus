export const isDev = () => {
  return process.env.NODE_ENV === 'development'
}

export const parseLineBreaks = text => text
  .replace(/\n/g, '<br/>')

export const slugify = str => str
  .toLowerCase()
  .replace(/[^\w\s-]/g, '')
  .replace(/[\s_-]+/g, '-')