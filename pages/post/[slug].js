import { importMarkdownFile } from '~/helpers/handleMarkdown';
import Layout from '~/components/Layout';

const Post = ({ content }) => (
  <Layout title={content.title}>
    <div className="row">
      <div className="col-desk-12">
        <div className="text">
          <img src={content.image} alt={content.title} />
          <h2><span className="highlight">{content.title}</span></h2>
          <p dangerouslySetInnerHTML={{__html: content.description.replace(/\n/g, '<br/>')}} />
        </div>
      </div>
    </div>
  </Layout>
)

Post.getInitialProps = async ({ query }) => {
  const data = await importMarkdownFile('facts', `${query.slug}.md`);
  return { content: data };
}

export default Post;