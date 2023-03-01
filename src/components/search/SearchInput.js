import debounce from 'lodash/debounce'
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react'
import {
  useDispatch,
  useSelector,
} from 'react-redux'
import {
  setSearchLoading,
  setSearchQuery,
  setSearchResults,
} from '~/store/actions'
import {
  selectMenuState,
  selectSearchLoading,
  selectSearchQuery,
} from '~/store/selectors'
import { getSearchResults } from '~/store/thunks'
import { MIN_SEARCH_QUERY_LENGTH } from '~/utils/constants'
import SvgIcon from '~/components/ui/SvgIcon'

const SearchInput = () => {
  const dispatch = useDispatch()
  const isMenuOpened = useSelector(selectMenuState)
  const searchLoading = useSelector(selectSearchLoading)
  const searchQuery = useSelector(selectSearchQuery)

  const handleSearchResults = useMemo(() => debounce((value) => {
    if (value.length >= MIN_SEARCH_QUERY_LENGTH) {
      dispatch(getSearchResults({ searchQuery: value }))
    } else {
      dispatch(setSearchLoading(false))
    }
  }, 500), [dispatch])

  const handleInputChange = useCallback((e) => {
    const value = e.target.value
    dispatch(setSearchQuery(value))
    if (value.length < MIN_SEARCH_QUERY_LENGTH) {
      dispatch(setSearchResults([]))
      dispatch(setSearchLoading(true))
    }
    handleSearchResults(value)
  }, [dispatch, handleSearchResults])

  const inputRef = useRef(null)

  useEffect(() => {
    if (isMenuOpened) {
      dispatch(setSearchQuery(''))
      dispatch(setSearchResults([]))
      inputRef.current.focus()
    }
  }, [isMenuOpened, dispatch])

  const displayLoader = searchLoading && searchQuery.length >= MIN_SEARCH_QUERY_LENGTH
  return (
    <div className="search-input">
      <input
        ref={inputRef}
        type="text"
        placeholder="Search here..."
        value={searchQuery}
        onChange={handleInputChange}
        data-cursor="transparent"
      />
      {displayLoader
        ? <div className="loader" />
        : <SvgIcon name="search" />
      }
    </div>
  )
}

export default SearchInput
