import { useSelector } from 'react-redux'
import { wrapper } from '~/store'
import { selectAllPosts } from '~/store/selectors'
import { getAllPosts } from '~/store/thunks'
import { SLOGAN } from '~/utils/constants'
import Layout from '~/components/Layout'
import Feed from '~/components/feed'

const HomePage = () => {
  const posts = useSelector(selectAllPosts)
  return (
    <Layout title={SLOGAN}>
      <Feed posts={posts} />
    </Layout>
  )
}

HomePage.getInitialProps = wrapper.getInitialPageProps(store => async ({ query }) => {
  await store.dispatch(getAllPosts(query))
})

export default HomePage
