import {
  useDispatch,
  useSelector,
} from 'react-redux'
import { setMenuState } from '~/store/actions'
import { selectAllPostsBySearchQuery } from '~/store/selectors'
import Link from '~/components/ui/Link'

const SearchResults = () => {
  const searchResults = useSelector(selectAllPostsBySearchQuery)
  const dispatch = useDispatch()
  return (
    <ul className="search-results">
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
              {result.title}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export default SearchResults
