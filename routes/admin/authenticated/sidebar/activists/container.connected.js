import React from 'react'
import { connect } from 'react-redux'
import { gql } from 'react-apollo'
//import { PaginationHOC } from '~client/components/data-grid/hocs'
import * as CommunitySelectors from '~client/community/selectors'

//import SelectableHOC from './selectable'

import {
  ListableHOC,
  SelectableHOC,
  FilterableHOC
} from './component/listable'

import Container from './container-v2'

const allActivistsQuery = gql`
  query allActivists ($search: String, $communityId: Int, $first: Int, $offset: Int) {
    searchActivistsOnCommunity (
      first: $first,
      offset: $offset,
      ctxCommunityId: $communityId,
      query: $search
    ) {
      totalCount,
      nodes {
        id,
        name,
        email,
        phone,
        mobilizations
      }
    }
  }
`

const allActivistsIdQuery = gql`
  query allActivistsIdQuery ($search: String, $communityId: Int) {
    searchActivistsOnCommunity (
      ctxCommunityId: $communityId,
      query: $search
    ) {
      nodes {
        id
      }
    }
  }
`

const mapStateToProps = (state) => ({
  communityId: CommunitySelectors.getCurrentId(state)
})

const mapQueryParams = ({ communityId, query }) => ({
  communityId,
  search: query
})

const Listable = ListableHOC({
  query: allActivistsQuery,
  queryParams: mapQueryParams,
  queryName: 'searchActivistsOnCommunity',
  parse: ({ mobilizations, ...data }) => ({
    ...data,
    mobilizations: JSON.parse(mobilizations)
  }),
  limit: 50
})

const Selectable = SelectableHOC({
  query: allActivistsIdQuery,
  queryParams: mapQueryParams,
  queryName: 'searchActivistsOnCommunity',
  parse: ({ id }) => id
})

const Filterable = FilterableHOC()

export default connect(mapStateToProps)(
  Filterable(
    Selectable(
      Listable(
        Container
      )
    )
  )
)

