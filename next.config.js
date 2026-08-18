const isDev = [
  'development',
].includes(process.env.NODE_ENV)

const withPWA = require('next-pwa')({
  dest: 'public',
  disable: isDev,
})

const nextConfig = withPWA({
  images: {
    // Image Optimization using Next.js' default loader is not compatible with `next export`
    // https://nextjs.org/docs/messages/export-image-api
    unoptimized: true,
  },
  poweredByHeader: false,
  // reactStrictMode: true,
})

module.exports = nextConfig
