import {
  useDispatch,
  useSelector,
} from 'react-redux'
import { setMenuState } from '~/store/actions'
import {
  selectPostsBySearchQuery,
  selectSearchQuery,
} from '~/store/selectors'
import HtmlContent from '~/components/ui/HtmlContent'
import Link from '~/components/ui/Link'
import { COLOR_PALETTE } from '~/utils/mappings'

const SearchResults = () => {
  const searchResults = useSelector(selectPostsBySearchQuery)
  const searchQuery = useSelector(selectSearchQuery)
  const dispatch = useDispatch()
  const highlightSearchKeyword = (text) => {
    const queryRegexp = new RegExp(searchQuery, 'ig')
    const matches = Array.from(new Set(text.match(queryRegexp)))
    matches.forEach((keyword) => {
      const keywordRegexp = new RegExp(`(${keyword})(?![^<]*>|[^<>]*<\/)`, 'g')
      text = text.replace(keywordRegexp, `<span style="color: ${COLOR_PALETTE.YELLOW}">${keyword}</span>`)
    })
    return text
  }
  return (
    <ul className="search-results">
      {searchQuery && !searchResults.length && (
        <li>No Results</li>
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
                content={highlightSearchKeyword(result.title)}
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
