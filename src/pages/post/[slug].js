import { useSelector } from 'react-redux'
import { wrapper } from '~/store'
import { selectSinglePost } from '~/store/selectors'
import { getPostBySlug } from '~/store/thunks'
import Layout from '~/components/Layout'
import Post from '~/components/post'

const PostPage = () => {
  const post = useSelector(selectSinglePost)
  return (
    <Layout title={post.title}>
      <Post post={post} />
    </Layout>
  )
}

PostPage.getInitialProps = wrapper.getInitialPageProps(store => async ({ query }) => {
  await store.dispatch(getPostBySlug({
    slug: query.slug,
  }))
})

export default PostPage
