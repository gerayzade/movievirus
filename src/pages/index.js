import { useSelector } from 'react-redux'
import { wrapper } from '~/store'
import { selectAllFactsByTag } from '~/store/selectors'
import { getAllFacts } from '~/store/thunks'
import Layout from '~/components/Layout'
import Feed from '~/components/feed'
import { SLOGAN } from '~/utils/constants'

const HomePage = ({ filterTag, error }) => {
  const posts = useSelector(selectAllFactsByTag)(filterTag)
  return (
    <Layout title={SLOGAN}>
      <Feed posts={posts} />
      <h1>{error}</h1>
    </Layout>
  )
}

HomePage.getInitialProps = wrapper.getInitialPageProps(store => async ({ query }) => {
  let error = 'no error'
  try {
    await store.dispatch(getAllFacts())
  } catch (e) {
    error = e
  }
  return {
    filterTag: query.tag || null,
    error,
  }
})

export default HomePage
