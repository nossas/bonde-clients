import React from 'react'
import { connect } from 'react-redux'
import { gql } from 'react-apollo'
import { PaginationHOC } from '~client/components/data-grid/hocs'
import * as CommunitySelectors from '~client/community/selectors'

import Container from './container'

const allActivistsQuery = gql`
  query allActivists ($communityId: Int, $first: Int, $offset: Int) {
    allActivists (
      first: $first,
      offset: $offset,
      condition: { communityId: $communityId }
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

const mapStateToProps = (state) => ({
  communityId: CommunitySelectors.getCurrentId(state)
})

const Pagination = PaginationHOC({
  query: allActivistsQuery,
  queryParams: ({ communityId }) => ({ communityId }),
  queryName: 'allActivists',
  parse: ({ mobilizations, ...data }) => ({
    ...data,
    mobilizations: JSON.parse(mobilizations)
  }),
  limit: 50
})

export default connect(mapStateToProps)(Pagination(Container))

