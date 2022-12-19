import PropTypes from 'prop-types'
import HtmlContent from '~/components/ui/HtmlContent'
import Link from '~/components/ui/Link'
import LazyLoad from '~/components/LazyLoad'
import Tags from '~/components/post/tags'

const Post = ({ post }) => {
  const soureUrl = new URL(post.source)
  return (
    <LazyLoad data={post}>
      <div className="row">
        <div className="col-lg-60 col-md-60 col-sm-60">
          <div className="post">
            <div
              className="image lazy"
              aria-label={post.title}
              data-src={post.image}
              role="img"
            />
            <div className="data">
              <h4>{'20 Mar, 2020'}</h4>
              <h2>
                <span className="highlight">
                  {post.title}
                </span>
              </h2>
              <HtmlContent
                content={post.description}
                tag="p"
              />
              <h4>Tags</h4>
              <Tags
                data={post.tags}
                filterUrl="/"
              />
              <h4>Source</h4>
              <Link
                href={soureUrl.href}
                data-cursor="white-outline"
              >
                <span>{soureUrl.hostname}</span>
                <span>{soureUrl.pathname}</span>
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
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string.isRequired,
  }),
}

export default Post