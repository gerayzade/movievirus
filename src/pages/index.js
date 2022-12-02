
import { useSelector } from 'react-redux'
import { wrapper } from '~/store'
import { selectAllFacts } from '~/store/selectors'
import { getAllFacts } from '~/store/thunks'
import Layout from '~/components/Layout'
import Feed from '~/components/posts/Feed'
import { SLOGAN } from '~/utils/constants'

const HomePage = () => {
  const posts = useSelector(selectAllFacts)
  return (
    <Layout title={SLOGAN}>
      <Feed posts={posts} />
    </Layout>
  )
}

export const getStaticProps = wrapper.getStaticProps(store => async (ctx) => {
  await store.dispatch(getAllFacts())
  return {}
})

export default HomePage
