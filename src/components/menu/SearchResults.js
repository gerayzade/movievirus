import {
  useDispatch,
  useSelector,
} from 'react-redux'
import { setMenuState } from '~/store/actions'
import HtmlContent from '~/components/ui/HtmlContent'
import Link from '~/components/ui/Link'
import { useSearch } from '~/utils/hooks'
import {
  selectPostsBySearchQuery,
  selectSearchQuery,
} from '~/store/selectors'

const SearchResults = () => {
  const dispatch = useDispatch()
  const {
    searchMessage,
    searchResults,
  } = useSearch({
    searchQuery: useSelector(selectSearchQuery),
    searchResults: useSelector(selectPostsBySearchQuery),
  })
  return (
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
  )
}

export default SearchResults
