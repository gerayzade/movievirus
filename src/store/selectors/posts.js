import { createSelector } from '@reduxjs/toolkit'
import { selectSearchQuery } from '~/store/selectors/layout'
import { slugify } from '~/utils'

export const selectAllPosts = (state) => state.posts.all

export const selectAllPostsByTag = createSelector(
  selectAllPosts,
  posts => filterTag => filterTag
    ? posts.filter(post => post.tags.map(tag => slugify(tag)).includes(filterTag))
    : posts
)

export const selectAllPostsBySearchQuery = createSelector(
  selectAllPosts,
  selectSearchQuery,
  (posts, query) => posts.filter((post) => {
    const regexp = new RegExp(query, 'ig')
    return query && (post.title.match(regexp) || post.tags.find(tag => tag.match(regexp)))
  })
)

export const selectSinglePost = (state) => state.posts.single
