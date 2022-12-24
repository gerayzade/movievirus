import { useSelector } from 'react-redux'
import { wrapper } from '~/store'
import { selectAllFactsByTag } from '~/store/selectors'
import { getAllFacts } from '~/store/thunks'
import Layout from '~/components/Layout'
import Feed from '~/components/feed'
import { SLOGAN } from '~/utils/constants'

const HomePage = ({ filterTag, data }) => {
  const posts = useSelector(selectAllFactsByTag)(filterTag)
  return (
    <Layout title={SLOGAN}>
      <Feed posts={posts} />
      <h1>{JSON.stringify(data)}</h1>
    </Layout>
  )
}

HomePage.getInitialProps = wrapper.getInitialPageProps(store => async ({ query }) => {
  const data = await store.dispatch(getAllFacts())
  return {
    data,
    filterTag: query.tag || null,
  }
})

export default HomePage
