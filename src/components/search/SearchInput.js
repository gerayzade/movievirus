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
  clearSearchResults,
  setSearchLoading,
  setSearchQuery,
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
      dispatch(getSearchResults({
        searchQuery: value,
      }))
    } else {
      dispatch(setSearchLoading(false))
    }
  }, 500), [dispatch])

  const handleInputChange = useCallback(({ target: { value } }) => {
    handleSearchResults.cancel()
    dispatch(setSearchLoading(true))
    dispatch(setSearchQuery(value))
    if (value.length < MIN_SEARCH_QUERY_LENGTH) {
      dispatch(clearSearchResults())
    }
    handleSearchResults(value)
  }, [dispatch, handleSearchResults])

  const inputRef = useRef(null)

  useEffect(() => {
    if (isMenuOpened) {
      dispatch(setSearchQuery(''))
      dispatch(clearSearchResults())
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
