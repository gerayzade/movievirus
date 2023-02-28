import { MIN_SEARCH_QUERY_LENGTH } from '~/utils/constants'
import { COLOR_PALETTE } from '~/utils/mappings'

const useSearch = ({
  searchLoading,
  searchQuery,
  searchResults,
}) => {
  let searchMessage
  if (searchQuery) {
    if (searchQuery.length < MIN_SEARCH_QUERY_LENGTH) {
      searchMessage = `Please enter at least ${MIN_SEARCH_QUERY_LENGTH} characters`
    } else if (!searchLoading && !searchResults.length) {
      searchMessage = 'No results'
    }
  }

  const queryRegexp = new RegExp(searchQuery, 'ig')

  searchResults = searchMessage
    ? []
    : searchResults.map((result) => {
      let title = result.title
      const matches = Array.from(new Set(title.match(queryRegexp)))
      matches.forEach((keyword) => {
        const keywordRegexp = new RegExp(`(${keyword})(?![^<]*>|[^<>]*<\/)`, 'g')
        title = title.replace(keywordRegexp, `<span style="color: ${COLOR_PALETTE.YELLOW}">${keyword}</span>`)
      })
      return {
        ...result,
        title,
      }
    })

  return {
    searchMessage,
    searchQuery,
    searchResults,
  }
}

export default useSearch
