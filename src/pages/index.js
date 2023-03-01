import { useRouter } from 'next/router'
import { useCallback } from 'react'
import {
  useDispatch,
  useSelector,
} from 'react-redux'
import { wrapper } from '~/store'
import {
  selectPosts,
  selectPostsTotal,
  selectPostsLoading,
} from '~/store/selectors'
import { getAllPosts } from '~/store/thunks'
import { SLOGAN } from '~/utils/constants'
import InfiniteLoading from '~/components/InfiniteLoading'
import Layout from '~/components/Layout'
import Feed from '~/components/feed'

const HomePage = () => {
  const dispatch = useDispatch()
  const posts = useSelector(selectPosts)
  const postsLoading = useSelector(selectPostsLoading)
  const postsTotal = useSelector(selectPostsTotal)

  const router = useRouter()
  
  const handleLoading = useCallback(() => {
    dispatch(getAllPosts({
      append: true,
      skip: posts.length,
      ...router.query,
    }))
  }, [dispatch, posts, router])

  const loadMore = posts.length < postsTotal

  return (
    <Layout title={SLOGAN}>
      <Feed posts={posts} />
      {loadMore && (
        <InfiniteLoading
          handleLoading={handleLoading}
          isLoading={postsLoading}
        />
      )}
    </Layout>
  )
}

HomePage.getInitialProps = wrapper.getInitialPageProps(store => async ({ query }) => {
  await store.dispatch(getAllPosts(query))
})

export default HomePage
