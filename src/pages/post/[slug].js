import {
  getPostPaths,
  getPostBySlug,
} from '~/utils/content'
import Layout from '~/components/Layout'
import Post from '~/components/facts/Post'

const Post = ({ post }) => (
  <Layout title={post.title}>
    <Post post={post} />
  </Layout>
)

export const getStaticProps = async ({ params }) => {
  const post = await getPostBySlug('facts', params.slug)
  return { props: { post } }
}

export const getStaticPaths = () => {
  return getPostPaths('facts', '/post', true)
}

export default Post
