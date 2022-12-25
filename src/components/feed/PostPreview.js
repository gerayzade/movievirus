import cn from 'classnames'
import PropTypes from 'prop-types'

const PostPreview = ({
  handleMouseEnter,
  handleMouseLeave,
  isActive,
  isMuted,
  post,
}) => {
  return (
    <div
      className={cn('post-preview', {
        'active': isActive,
        'muted': isMuted,
      })}
      onMouseEnter={handleMouseEnter} 
      onMouseMove={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="image lazy"
        aria-label={post.title}
        data-src={post.image}
        role="img"
      />
      <div className="layer">
        <h2>
          <span className="highlight">
            {post.title}
          </span>
        </h2>
      </div>
    </div>
  )
}

PostPreview.defaultProps = {
  handleMouseEnter: () => {},
  handleMouseLeave: () => {},
  isActive: false,
  isMuted: false,
}

PostPreview.propTypes = {
  handleMouseEnter: PropTypes.func,
  handleMouseLeave: PropTypes.func,
  isActive: PropTypes.bool,
  isMuted: PropTypes.bool,
  post: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }),
}

export default PostPreview
