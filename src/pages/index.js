import { getAllPosts } from '~/utils/content'
import Layout from '~/components/Layout'
import Feed from '~/components/facts/Feed'
import { SLOGAN } from '~/utils/constants'

const Index = ({ facts }) => (
  <Layout title={SLOGAN}>
    <Feed facts={facts} />
  </Layout>
)

export const getStaticProps = async () => {
  const facts = await getAllPosts('facts', ['title', 'image'])
  return {
    props: {
      facts,
    },
  }
}

export default Index
