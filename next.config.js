module.exports = {
  images: {
    // Image Optimization using Next.js' default loader is not compatible with `next export`
    // https://nextjs.org/docs/messages/export-image-api
    unoptimized: true,
  },
  poweredByHeader: false,
  // reactStrictMode: true,

  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    }
    return config
  },
}
