import {
  useDispatch,
  useSelector,
} from 'react-redux'
import {
  useEffect,
  useRef,
} from 'react'
import { setSearchQuery } from '~/store/actions'
import {
  selectMenuState,
  selectSearchQuery,
} from '~/store/selectors'
import SvgIcon from '~/components/ui/SvgIcon'

const SearchInput = () => {
  const isMenuOpened = useSelector(selectMenuState)
  const searchQuery = useSelector(selectSearchQuery)
  const dispatch = useDispatch()
  const inputRef = useRef(null)
  useEffect(() => {
    if (isMenuOpened) {
      dispatch(setSearchQuery(''))
      inputRef.current.focus()
    }
  }, [isMenuOpened, dispatch])
  return (
    <div className="search-input">
      <input
        ref={inputRef}
        type="text"
        placeholder="Search here..."
        value={searchQuery}
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        data-cursor="transparent"
      />
      <SvgIcon name="search" />
    </div>
  )
}

export default SearchInput
