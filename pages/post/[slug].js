import { getPostPaths, getPostBySlug } from '~/lib/content';
import Layout from '~/components/Layout';
import FactPost from '~/components/facts/FactPost';

const Post = ({ post }) => (
  <Layout title={post.title}>
    <FactPost post={post} />
  </Layout>
)

export const getStaticProps = async ({ params }) => {
  const post = await getPostBySlug('facts', params.slug);
  return { props: { post } };
}

export const getStaticPaths = () => {
  return getPostPaths('facts', '/post', true);
}

export default Post;