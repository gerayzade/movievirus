export const selectAllPosts = (state) => state.posts.all.entries

export const selectAllPostsTotalCount = (state) => state.posts.all.totalCount

export const selectPostsLoading = (state) => state.posts.loading

export const selectSinglePost = (state) => state.posts.single
