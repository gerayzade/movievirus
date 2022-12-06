import { useSelector } from 'react-redux'
import { wrapper } from '~/store'
import { selectSingleFact } from '~/store/selectors'
import { getFactBySlug } from '~/store/thunks'
import contentAPI from '~/utils/content'
import Layout from '~/components/Layout'
import Post from '~/components/posts/Post'

const PostPage = () => {
  const post = useSelector(selectSingleFact)
  return (
    <Layout title={post.title}>
      <Post post={post} />
    </Layout>
  )
}

export const getStaticProps = wrapper.getStaticProps(store => async (ctx) => {
  await store.dispatch(getFactBySlug({
    slug: ctx.params.slug,
  }))
  return {}
})

export const getStaticPaths = async () => {
  const paths = await contentAPI.getPostPaths({
    postType: 'facts',
  })
  return {
    paths,
    fallback: false,
  }
}

export default PostPage
