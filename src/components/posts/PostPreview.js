import cn from 'classnames'

const PostPreview = ({
  data: { 
    image,
    title,
  },
  handleMouseEnter,
  handleMouseLeave,
  isActive,
  isMuted,
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
        aria-label={title}
        data-src={image}
        role="img"
      />
      <div className="layer">
        <h4>
          <span className="highlight">
            {title}
          </span>
        </h4>
      </div>
    </div>
  )
}

export default PostPreview
