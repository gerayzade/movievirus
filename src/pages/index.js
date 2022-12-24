import { useSelector } from 'react-redux'
import { wrapper } from '~/store'
import { selectAllPostsByTag } from '~/store/selectors'
import { getAllPosts } from '~/store/thunks'
import Layout from '~/components/Layout'
import Feed from '~/components/feed'
import { SLOGAN } from '~/utils/constants'

const HomePage = ({ filterTag }) => {
  const posts = useSelector(selectAllPostsByTag)(filterTag)
  return (
    <Layout title={SLOGAN}>
      <Feed posts={posts} />
    </Layout>
  )
}

HomePage.getInitialProps = wrapper.getInitialPageProps(store => async ({ query }) => {
  await store.dispatch(getAllPosts())
  return {
    filterTag: query.tag || null,
  }
})

export default HomePage
