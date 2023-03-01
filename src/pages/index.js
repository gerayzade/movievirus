import { useRouter } from 'next/router'
import { useCallback } from 'react'
import {
  useDispatch,
  useSelector,
} from 'react-redux'
import { wrapper } from '~/store'
import {
  selectAllPosts,
  selectAllPostsTotalCount,
  selectPostsLoading,
} from '~/store/selectors'
import { getAllPosts } from '~/store/thunks'
import { SLOGAN } from '~/utils/constants'
import InfiniteLoading from '~/components/InfiniteLoading'
import Layout from '~/components/Layout'
import Feed from '~/components/feed'

const HomePage = () => {
  const dispatch = useDispatch()
  const isLoading = useSelector(selectPostsLoading)
  const posts = useSelector(selectAllPosts)
  const totalCount = useSelector(selectAllPostsTotalCount)

  const router = useRouter()
  
  const handleLoading = useCallback(() => {
    dispatch(getAllPosts({
      append: true,
      skip: posts.length,
      ...router.query,
    }))
  }, [dispatch, posts, router])

  const loadMore = posts.length < totalCount

  return (
    <Layout title={SLOGAN}>
      <Feed posts={posts} />
      {loadMore && (
        <InfiniteLoading
          handleLoading={handleLoading}
          isLoading={isLoading}
        />
      )}
    </Layout>
  )
}

HomePage.getInitialProps = wrapper.getInitialPageProps(store => async ({ query }) => {
  await store.dispatch(getAllPosts(query))
})

export default HomePage
