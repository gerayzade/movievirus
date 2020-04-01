import { connect } from 'react-redux';
import { importMarkdownFiles } from '~/helpers/handleMarkdown';
import Layout from '~/components/Layout';
import FactsList from '~/components/facts/FactsList';

class Index extends React.Component {
  static async getInitialProps() {
    const data = await importMarkdownFiles('facts');
    return { facts: data };
  }
  render() {
    return (
      <Layout title="The most viral facts from film industry">
        <FactsList facts={this.props.facts} />
      </Layout>
    );
  }
}

export default connect()(Index);