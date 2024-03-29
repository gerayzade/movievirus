export const isDev = () => {
  return [
    'development',
  ].includes(process.env.NODE_ENV)
}

export const parseLineBreaks = text => text
  .replace(/\n/g, '<br/>')

export const parseURL = (url) => {
  const [
    href,
    protocol,
    hostname,
    pathname,
    search,
  ] = url.match(/^(https||http)?:\/\/([^\/?#]+)(\/[^?#]*)?(\?[^#]*)?(#.*)?$/i)

  return {
    href,
    protocol,
    hostname,
    pathname,
    search,
  }
}

export const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const slugify = str => str
  .toLowerCase()
  .replace(/[^\w\s-]/g, '')
  .replace(/[\s_-]+/g, '-')

export const camelCase = str => str
  .replace(/\s+/g, '-')
  .split('-')
  .map((word, i) => i === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1))
  .join('')
