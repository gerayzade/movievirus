import PropTypes from 'prop-types'
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import LazyLoad from '~/components/LazyLoad'
import Link from '~/components/ui/Link'
import PostPreview from '~/components/feed/PostPreview'
import Quote from '~/components/Quote'

const Feed = ({ posts }) => {
  const initialState = useMemo(() => ({
    active: [-1, -1],
    x: 0,
  }), [])

  const [state, setState] = useState(initialState)
  const [mouseEvents, setMouseEvents] = useState(true)

  const timeoutRef = useRef()

  const onScroll = useCallback(() => { 
    setState(initialState)
    setMouseEvents(false)
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => { 
      setMouseEvents(true)
    }, 400)
  }, [initialState])

  useEffect(() => {
    window.addEventListener('scroll', onScroll)

    return () => {
      clearTimeout(timeoutRef.current)
      window.removeEventListener('scroll', onScroll)
    }
  }, [onScroll])

  const { active, x } = state
  const [activeRow, activeCol] = active

  const handleMouseEnter = useCallback((e, rowIndex, colIndex) => {
    e.persist()
    const isColActive = activeRow === rowIndex && activeCol === colIndex
    if (!mouseEvents || isColActive) return
    const vw = window.innerWidth
    const pos = e.pageX / vw
    const x = vw > 1024 && posts.length > 4
      ? (pos > 0.5 ? -1 : 1) * [30, 15, 0, 15, 30, 22.5, 7.5, 7.5, 22.5][colIndex % 9]
      : 0
    setState({
      active: [rowIndex, colIndex],
      x,
    })
  }, [activeRow, activeCol, mouseEvents, posts])

  const handleMouseLeave = useCallback((e) => {
    setState(initialState)
  }, [initialState])

  // Render alternating rows with 5 and 4 posts
  let pointer = 0
  const n = posts.length
  const rows = Array(Math.floor(n / 9) * 2 + Math.ceil((n - 9 * Math.floor(n / 9)) / 5)).fill(0)
  return (
    <LazyLoad data={posts}>
      <div className="posts-feed row">
        {rows.map((_, rowIndex) => {
          const rowPosts = posts.slice(pointer, pointer += (rowIndex % 2 === 0 ? 5 : 4))
          const rowStyles = {
            transform: `translateX(${x !== 0 ? x * (1 + ((rowIndex % 3) * 0.4)) : 0}px)`, 
            zIndex: rowIndex === activeRow ? 2 : 1,
          }

          const quoteIndex = Math.floor(rowIndex / 2)
          const displayQuote = rowIndex === rows.length - 1
            ? rowPosts.length % 2 !== 0
            : rowIndex % 2 === 0
          return (
            <div
              className="row padded"
              style={rowStyles}
              key={rowIndex}
            >
              {rowPosts.map((post, colIndex, cols) => {
                const index = pointer - cols.length + colIndex
                const isActive = index === activeCol
                const isMuted = ![index, -1].includes(activeCol)
                return (
                  <div
                    className="col-lg-12 col-md-30 col-sm-60"
                    key={post.id}
                  >
                    <Link
                      href="/post/[slug]"
                      as={`/post/${post.slug}`}
                      data-cursor="white-outline"
                    >
                      <PostPreview
                        handleMouseEnter={(e) => handleMouseEnter(e, rowIndex, index)}
                        handleMouseLeave={(e) => handleMouseLeave(e)}
                        isActive={isActive}
                        isMuted={isMuted}
                        post={post}
                      />
                    </Link>
                  </div>
                )
              })}
              {displayQuote && (
                <Quote index={quoteIndex} />
              )}
            </div>
          )
        })}
      </div>
    </LazyLoad>
  )
}

Feed.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object),
}

export default Feed
