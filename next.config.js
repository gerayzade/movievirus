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
  async redirects() {
    // Consolidate the legacy tag-filter query URLs onto the real /tag/[slug] pages.
    // Both spellings existed: plural `?tags=` (still generated until this release) and
    // stale singular `?tag=`. The query value becomes the path slug.
    return [
      {
        source: '/',
        has: [{ type: 'query', key: 'tags', value: '(?<slug>[^&]+)' }],
        destination: '/tag/:slug',
        permanent: true,
      },
      {
        source: '/',
        has: [{ type: 'query', key: 'tag', value: '(?<slug>[^&]+)' }],
        destination: '/tag/:slug',
        permanent: true,
      },
    ]
  },
})

module.exports = nextConfig
