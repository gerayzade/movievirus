import { Fragment } from 'react'
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
import { useSearch } from '~/utils/hooks'
import HtmlContent from '~/components/ui/HtmlContent'
import Link from '~/components/ui/Link'

const SearchResults = () => {
  const dispatch = useDispatch()

  const {
    searchMessage,
    searchResults,
  } = useSearch({
    searchLoading: useSelector(selectSearchLoading),
    searchQuery: useSelector(selectSearchQuery),
    searchResults: useSelector(selectSearchResults),
  })
  return (
    <Fragment>
      <ul className="search-results">
        {searchMessage && (
          <li>{searchMessage}</li>
        )}
        {searchResults.map((result, i) => {
          return (
            <li key={i}>
              <Link
                className="result"
                href="/post/[slug]"
                as={`/post/${result.slug}`}
                data-cursor="white-outline"
                onClick={(e) => dispatch(setMenuState(false))}
              >
                <HtmlContent
                  content={result.title}
                  tag="span"
                />
              </Link>
            </li>
          )
        })}
      </ul>
    </Fragment>
  )
}

export default SearchResults
