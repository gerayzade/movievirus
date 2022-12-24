import {
  useDispatch,
  useSelector,
} from 'react-redux'
import { useEffect } from 'react'
import {
  selectAllPosts,
  selectMenuState,
} from '~/store/selectors'
import { getAllPosts } from '~/store/thunks'
import SearchInput from '~/components/menu/SearchInput'
import SearchResults from '~/components/menu/SearchResults'

const Search = () => {
  const isMenuOpened = useSelector(selectMenuState)
  const isPostsListLoaded = Boolean(useSelector(selectAllPosts).length)
  const dispatch = useDispatch()
  useEffect(() => {
    if (isMenuOpened && !isPostsListLoaded) {
      dispatch(getAllPosts())
    }
  }, [isMenuOpened, isPostsListLoaded, dispatch])
  return (
    <div className="search">
      <SearchInput />
      <SearchResults />
    </div>
  )
}

export default Search
