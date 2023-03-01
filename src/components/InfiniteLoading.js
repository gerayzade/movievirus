import PropTypes from 'prop-types'
import {
  Fragment,
  useCallback,
  useEffect,
} from 'react'

const InfiniteLoading = ({ handleLoading, isLoading }) => {
  const handleScroll = useCallback((e) => {
    if (isLoading) return

    const offset = 280
    const scrollHeight = document.documentElement.scrollHeight
    const scrollPosition = document.documentElement.scrollTop + window.innerHeight
    const isBottomReached = Math.ceil(scrollPosition) >= (scrollHeight - offset)

    if (isBottomReached) {
      handleLoading()
    }
  }, [handleLoading, isLoading])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  useEffect(() => {
    const scrollHeight = document.documentElement.scrollHeight
    const isScrollDisabled = scrollHeight === window.innerHeight

    if (!isLoading && isScrollDisabled) {
      handleLoading()
    }
  }, [handleLoading, isLoading])

  return isLoading
    ? (
      <div className="infinite-loading">
        <div className="loader" />
      </div>
    )
    : <Fragment />
}

InfiniteLoading.propTypes = {
  handleLoading: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
}

export default InfiniteLoading
