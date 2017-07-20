import React from 'react'
import { connect } from 'react-redux'
import { graphql, gql } from 'react-apollo'
import * as CommunitySelectors from '~client/community/selectors'

import Container from './container'

const allActivistsQuery = gql`
  query allActivists ($communityId: Int, $first: Int, $cursor: Cursor) {
    allActivists (
      first: $first,
      after: $cursor,
      condition: { communityId: $communityId }
    ) {
      totalCount,
      nodes {
        id,
        name,
        email,
        phone
      },
      pageInfo {
        hasNextPage,
        endCursor
      }
    }
  }
`

const WithActivistsQuery = graphql(allActivistsQuery, {
  options: (props) => ({
    variables: {
      communityId: props.communityId,
      first: 10
    }
  }),
  props: ({ data: { loading, allActivists, fetchMore }, ownProps: { communityId }}) => ({
    loading,
    data: allActivists ? allActivists.nodes : [],
    totalCount: allActivists ? allActivists.totalCount : 0,
    onNextPage: () => {
      return fetchMore({
        query: allActivistsQuery,
        variables: {
          communityId,
          first: 10,
          cursor: allActivists ? allActivists.pageInfo.endCursor : null
        },
        updateQuery: (previousResult, { fetchMoreResult }) => fetchMoreResult
      })
    }
  })
})

const mapStateToProps = (state) => ({
  communityId: CommunitySelectors.getCurrentId(state)
})

export default connect(mapStateToProps)(
  WithActivistsQuery(Container)
)

