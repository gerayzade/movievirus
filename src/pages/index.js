import { useSelector } from 'react-redux'
import { wrapper } from '~/store'
import { selectAllFactsByTag } from '~/store/selectors'
import { getAllFacts } from '~/store/thunks'
import Layout from '~/components/Layout'
import Feed from '~/components/feed'
import { SLOGAN } from '~/utils/constants'

const HomePage = ({ initialState, filterTag }) => {
  console.log(initialState)
  const posts = useSelector(selectAllFactsByTag)(filterTag)
  return (
    <Layout title={SLOGAN}>
      <Feed posts={posts} />
    </Layout>
  )
}

HomePage.getInitialProps = wrapper.getInitialPageProps(store => async ({ query }) => {
  await store.dispatch(getAllFacts())
  return {
    initialState: store.getState(),
    filterTag: query.tag || null,
  }
})

export default HomePage
