import moment from 'moment'
import PropTypes from 'prop-types'
import { useMemo } from 'react'
import HtmlContent from '~/components/ui/HtmlContent'
import Link from '~/components/ui/Link'
import LazyLoad from '~/components/LazyLoad'
import Tags from '~/components/post/Tags'

const Post = ({ post }) => {
  const date = useMemo(() => moment(post.createdAt).format('DD MMM, YYYY'), [post])
  const sourceUrl = useMemo(() => new URL(post.sourceUrl), [post])
  return (
    <LazyLoad data={post}>
      <div className="row">
        <div className="col-lg-60 col-md-60 col-sm-60">
          <div className="post">
            <div
              className="image lazy"
              aria-label={post.featuredImage.title}
              data-src={post.featuredImage.src}
              role="img"
            />
            <div className="post-info">
              <h2>
                <span className="highlight">
                  {post.title}
                </span>
              </h2>
              <h3>{date}</h3>
              <HtmlContent
                content={post.description}
                tag="p"
              />
              <h3>Tags</h3>
              <Tags
                filterUrl="/"
                tags={post.tags}
              />
              <h3>Source</h3>
              <Link
                href={sourceUrl.href}
                data-cursor="white-outline"
              >
                <span>{sourceUrl.hostname}</span>
                <span>{sourceUrl.pathname}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </LazyLoad>
  )
}

Post.propTypes = {
  post: PropTypes.shape({
    createdAt: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    featuredImage: PropTypes.shape({
      src: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
    sourceUrl: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string.isRequired,
  }).isRequired,
}

export default Post
