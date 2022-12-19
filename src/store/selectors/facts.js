import { createSelector } from '@reduxjs/toolkit'
import { slugify } from '~/utils'

export const selectAllFacts = (state) => state.facts.all

export const selectAllFactsByTag = createSelector(
  selectAllFacts,
  facts => filterTag => filterTag
    ? facts.filter(fact => fact.tags.map(tag => slugify(tag)).includes(filterTag))
    : facts
)

export const selectSingleFact = (state) => state.facts.single
