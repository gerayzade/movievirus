import { useSelector } from 'react-redux'
import { wrapper } from '~/store'
import { selectSinglePost } from '~/store/selectors'
import { getPostBySlug } from '~/store/thunks'
import Layout from '~/components/Layout'
import NotFound from '~/components/NotFound'
import Post from '~/components/post'

const PostPage = () => {
  const post = useSelector(selectSinglePost)
  return Object.keys(post).length
    ? (
      <Layout title={post.title}>
        <Post post={post} />
      </Layout>
    )
    : (
      <NotFound />
    )
}

PostPage.getInitialProps = wrapper.getInitialPageProps(store => async ({ query }) => {
  await store.dispatch(getPostBySlug(query))
})

export default PostPage
