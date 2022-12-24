import postsReducer from './posts'
import layoutReducer from './layout'

const rootReducer = {
  posts: postsReducer,
  layout: layoutReducer,
}

export default rootReducer
