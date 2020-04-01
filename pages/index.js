import { importMarkdownFiles } from '~/helpers/handleMarkdown';
import Layout from '~/components/Layout';
import FactsList from '~/components/facts/FactsList';

const Index = ({ facts }) => (
  <Layout title="The most viral facts from film industry">
    <FactsList facts={facts} />
  </Layout>
)

Index.getInitialProps = async () => {
  const data = await importMarkdownFiles('facts');
  return { facts: data };
}

export default Index;