import { getAllPosts } from '~/lib/content';
import Layout from '~/components/Layout';
import FactStrip from '~/components/facts/FactStrip';

const Index = ({ facts }) => (
  <Layout title="The most viral facts from film industry">
    <FactStrip facts={facts} />
  </Layout>
)

export const getStaticProps = async () => {
  const facts = await getAllPosts('facts', ['title', 'image']);
  return { props: { facts } };
}

export default Index;