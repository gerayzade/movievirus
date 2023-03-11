import uniq from 'lodash/uniq'
import { MIN_SEARCH_QUERY_LENGTH } from '~/utils/constants'
import { COLOR_PALETTE } from '~/utils/mappings'

export const getSearchMessage = ({
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
  return searchMessage
}

export const getSearchResultsWithHighlights = ({
  searchQuery,
  searchResults,
}) => {
  return searchResults.map((result) => {
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
}
