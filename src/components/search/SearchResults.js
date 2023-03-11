import {
  Fragment,
  useCallback,
} from 'react'
import {
  useDispatch,
  useSelector,
} from 'react-redux'
import { setMenuState } from '~/store/actions'
import {
  selectSearchLoading,
  selectSearchQuery,
  selectSearchResults,
} from '~/store/selectors'
import {
  getSearchMessage,
  getSearchResultsWithHighlights,
} from '~/utils/search'
import HtmlContent from '~/components/ui/HtmlContent'
import Link from '~/components/ui/Link'

const SearchResults = () => {
  const dispatch = useDispatch()
  const searchLoading = useSelector(selectSearchLoading)
  const searchQuery = useSelector(selectSearchQuery)
  const searchResults = useSelector(selectSearchResults)

  const searchMessage = getSearchMessage({
    searchLoading,
    searchQuery,
    searchResults,
  })

  const searchResultsWithHighlights = getSearchResultsWithHighlights({
    searchQuery,
    searchResults,
  })

  const handleClick = useCallback((e) => {
    dispatch(setMenuState(false))
  }, [dispatch])

  return (
    <Fragment>
      <ul className="search-results">
        {searchMessage
          ? <li>{searchMessage}</li>
          : (
            searchResultsWithHighlights.map((result, i) => {
              return (
                <li key={i}>
                  <Link
                    className="result"
                    href="/post/[slug]"
                    as={`/post/${result.slug}`}
                    data-cursor="white-outline"
                    onClick={handleClick}
                  >
                    <HtmlContent
                      content={result.title}
                      tag="span"
                    />
                  </Link>
                </li>
              )
            })
          )
        }
      </ul>
    </Fragment>
  )
}

export default SearchResults
