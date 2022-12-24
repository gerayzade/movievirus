export const isDev = () => {
  return [
    'development',
  ].includes(process.env.NODE_ENV)
}

export const parseLineBreaks = text => text
  .replace(/\n/g, '<br/>')

export const slugify = str => str
  .toLowerCase()
  .replace(/[^\w\s-]/g, '')
  .replace(/[\s_-]+/g, '-')