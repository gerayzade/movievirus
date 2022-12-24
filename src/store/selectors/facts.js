import { createSelector } from '@reduxjs/toolkit'
import { selectSearchQuery } from '~/store/selectors/layout'
import { slugify } from '~/utils'

export const selectAllFacts = (state) => state.facts.all

export const selectAllFactsByTag = createSelector(
  selectAllFacts,
  facts => filterTag => filterTag
    ? facts.filter(fact => fact.tags.map(tag => slugify(tag)).includes(filterTag))
    : facts
)

export const selectAllFactsBySearchQuery = createSelector(
  selectAllFacts,
  selectSearchQuery,
  (facts, query) => facts.filter((fact) => {
    const regexp = new RegExp(query, 'ig')
    return query && (fact.title.match(regexp) || fact.tags.find(tag => tag.match(regexp)))
  })
)

export const selectSingleFact = (state) => state.facts.single
