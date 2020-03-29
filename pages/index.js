import Layout from 'components/Layout';
import FactsList from 'components/facts/FactsList';

const Index = () => (
  <Layout title="#StayHome">
    <FactsList facts={Array.from(Array(18).keys())} />
  </Layout>
);

export default Index;