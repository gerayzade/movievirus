import postsReducer from './posts'
import layoutReducer from './layout'
import searchReducer from './search'

const rootReducer = {
  posts: postsReducer,
  layout: layoutReducer,
  search: searchReducer,
}

export default rootReducer
