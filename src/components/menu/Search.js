import SearchInput from '~/components/menu/SearchInput'
import SearchResults from '~/components/menu/SearchResults'

const Search = () => {
  return (
    <div className="search">
      <SearchInput />
      <SearchResults />
    </div>
  )
}

export default Search
