export const isDev = () => {
  return process.env.NODE_ENV === 'development'
}

export const parseLineBreaks = (text) => text.replace(/\n/g, '<br/>')
