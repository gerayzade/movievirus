import { useSelector } from 'react-redux'
import { wrapper } from '~/store'
import { selectSingleFact } from '~/store/selectors'
import { getFactBySlug } from '~/store/thunks'
import Layout from '~/components/Layout'
import Post from '~/components/post'

const PostPage = () => {
  const post = useSelector(selectSingleFact)
  return (
    <Layout title={post.title}>
      <Post post={post} />
    </Layout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ query }) => {
  await store.dispatch(getFactBySlug({
    slug: query.slug,
  }))
})

export default PostPage
