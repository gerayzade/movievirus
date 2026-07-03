import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import {
  useDispatch,
  useSelector,
} from 'react-redux'
import { wrapper } from '~/store'
import {
  selectPosts,
  selectPostsTotal,
  selectPostsLoading,
} from '~/store/selectors'
import { getAllPosts } from '~/store/thunks'
import contentfulService from '~/utils/contentful'
import { slugify } from '~/utils'
import InfiniteLoading from '~/components/InfiniteLoading'
import Layout from '~/components/Layout'
import Feed from '~/components/feed'

const TagPage = ({ tagName }) => {
  const dispatch = useDispatch()
  const posts = useSelector(selectPosts)
  const postsLoading = useSelector(selectPostsLoading)
  const postsTotal = useSelector(selectPostsTotal)

  const router = useRouter()

  const handleLoading = useCallback(() => {
    dispatch(getAllPosts({
      append: true,
      skip: posts.length,
      tags: router.query.slug,
    }))
  }, [dispatch, posts, router])

  const loadMore = posts.length < postsTotal

  const description = `Discover viral facts, behind-the-scenes secrets and little-known trivia about ${tagName} on MovieVirus.`

  return (
    <Layout
      title={tagName}
      description={description}
    >
      <Feed posts={posts} />
      {loadMore && (
        <InfiniteLoading
          handleLoading={handleLoading}
          isLoading={postsLoading}
        />
      )}
    </Layout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ params }) => {
  const { slug } = params

  const tagNames = await contentfulService.getTags({ limit: 1000 })
  const tagName = tagNames.find(name => slugify(name) === slug)

  if (!tagName) {
    return { notFound: true }
  }

  await store.dispatch(getAllPosts({ tags: slug }))

  if (!store.getState().posts.all.total) {
    return { notFound: true }
  }

  return { props: { tagName } }
})

TagPage.propTypes = {
  tagName: PropTypes.string.isRequired,
}

export default TagPage
