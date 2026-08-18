import { NextResponse } from 'next/server'
import { slugify } from '~/utils'

export const config = {
  matcher: '/',
}

// Consolidate the legacy tag-filter query URLs onto the real /tag/[slug] pages.
// Both spellings existed: plural `?tags=` (generated until recently) and stale
// singular `?tag=`. Done in middleware rather than next.config redirects because
// redirects() always forwards the incoming query string, leaving a redundant
// tag param on the destination URL.
export function middleware(request) {
  const url = request.nextUrl.clone()
  const tag = url.searchParams.get('tags') || url.searchParams.get('tag')

  if (!tag) {
    return NextResponse.next()
  }

  // Legacy links carried already-slugified values, but slugify again so
  // hand-typed variants (`?tag=Star Wars`) still land on a valid page.
  url.pathname = `/tag/${slugify(tag)}`
  url.searchParams.delete('tags')
  url.searchParams.delete('tag')

  return NextResponse.redirect(url, 308)
}
