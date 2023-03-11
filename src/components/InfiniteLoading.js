import PropTypes from 'prop-types'
import {
  Fragment,
  useCallback,
  useEffect,
  useRef,
} from 'react'
import {
  useSelector,
} from 'react-redux'
import { selectMenuState } from '~/store/selectors'

const InfiniteLoading = ({ handleLoading, isLoading }) => {
  const isMenuOpened = useSelector(selectMenuState)

  const scrollContainerRef = useRef(null)

  useEffect(() => {
    scrollContainerRef.current = isMenuOpened
      ? document.querySelector('.menu > .content')
      : document.documentElement
  }, [isMenuOpened])

  const handleScroll = useCallback((e) => {
    if (isLoading) return

    const offset = 280
    const scrollHeight = scrollContainerRef.current.scrollHeight
    const scrollPosition = scrollContainerRef.current.scrollTop + window.innerHeight
    const isBottomReached = Math.ceil(scrollPosition) >= (scrollHeight - offset)

    if (isBottomReached) {
      handleLoading()
    }
  }, [handleLoading, isLoading])

  useEffect(() => {
    const useWindowObject = scrollContainerRef.current.tagName === 'HTML'
    const element = useWindowObject ? window : scrollContainerRef.current

    element.addEventListener('scroll', handleScroll)

    return () => {
      element.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  useEffect(() => {
    const scrollHeight = scrollContainerRef.current.scrollHeight
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
