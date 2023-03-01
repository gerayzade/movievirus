export const selectPosts = (state) => state.posts.all.entries

export const selectPostsTotal = (state) => state.posts.all.total

export const selectPostsLoading = (state) => state.posts.loading

export const selectSinglePost = (state) => state.posts.single
