import uniq from 'lodash/uniq'
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
import { MIN_SEARCH_QUERY_LENGTH } from '~/utils/constants'
import { COLOR_PALETTE } from '~/utils/mappings'
import HtmlContent from '~/components/ui/HtmlContent'
import Link from '~/components/ui/Link'

const SearchResults = () => {
  const dispatch = useDispatch()
  const searchLoading = useSelector(selectSearchLoading)
  const searchQuery = useSelector(selectSearchQuery)
  const searchResults = useSelector(selectSearchResults)

  const searchResultsWithHighlights = searchResults.map((result) => {
    let title = result.title
    // Split the search query into an array of words
    const words = searchQuery
      .replace(/[^a-zA-Z0-9 ]/g, ' ')
      .replace(/ +/g, ' ')
      .trim()
      .split(' ')
    // Replace matched keywords with a highlighted version
    words.forEach((word) => {
      const queryRegexp = new RegExp(word, 'ig')
      const matches = uniq(title.match(queryRegexp))
      matches.forEach((match) => {
        const matchRegexp = new RegExp(`(^|["\' ])(${match})(?![^<]*>|[^<>]*<\/)`, 'g')
        title = title.replace(matchRegexp, `$1<span style="background: ${COLOR_PALETTE.RED}">${match}</span>`)
      })
    })
    return {
      ...result,
      title,
    }
  })

  let searchMessage
  if (searchQuery) {
    if (searchQuery.length < MIN_SEARCH_QUERY_LENGTH) {
      searchMessage = `Please enter at least ${MIN_SEARCH_QUERY_LENGTH} characters`
    } else if (!searchLoading && !searchResults.length) {
      searchMessage = 'No results'
    }
  }

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
