import contentfulService from '~/utils/contentful'
import { slugify } from '~/utils'

const SitemapPage = () => null

export const getServerSideProps = async ({ res }) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  const limit = 1000
  let skip = 0
  let hasMore = true
  const posts = []

  while (hasMore) {
    const { entries } = await contentfulService.getEntries('post', { limit, skip })
    posts.push(...entries)
    hasMore = entries.length === limit
    skip += limit
  }

  const tagNames = await contentfulService.getTags({ limit: 1000 })

  const formatDate = date => new Date(date).toISOString().split('T')[0]
  const entryDate = post => post.updatedAt || post.createdAt

  const pages = [
    { loc: `${baseUrl}/`, lastmod: posts[0] && entryDate(posts[0]), priority: '1.0' },
    ...tagNames.map(name => ({
      loc: `${baseUrl}/tag/${slugify(name)}`,
      priority: '0.6',
    })),
    ...posts.map(post => ({
      loc: `${baseUrl}/post/${post.slug}`,
      lastmod: entryDate(post),
      priority: '0.8',
    })),
  ]

  const urls = pages.map(({ loc, lastmod, priority }) => `  <url>
    <loc>${loc}</loc>${lastmod ? `\n    <lastmod>${formatDate(lastmod)}</lastmod>` : ''}
    <priority>${priority}</priority>
  </url>`).join('\n')

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`

  res.setHeader('Content-Type', 'application/xml')
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400')
  res.write(sitemap)
  res.end()

  return { props: {} }
}

export default SitemapPage
