
import { useSelector } from 'react-redux'
import { wrapper } from '~/store'
import { selectAllFacts } from '~/store/selectors'
import { getAllFacts } from '~/store/thunks'
import Layout from '~/components/Layout'
import Feed from '~/components/facts/Feed'
import { SLOGAN } from '~/utils/constants'

const HomePage = () => {
  const facts = useSelector(selectAllFacts)
  return (
    <Layout title={SLOGAN}>
      <Feed facts={facts} />
    </Layout>
  )
}

export const getStaticProps = wrapper.getStaticProps(store => async (ctx) => {
  await store.dispatch(getAllFacts())
  return {}
})

export default HomePage
