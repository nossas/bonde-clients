import React from 'react'
import { connect } from 'react-redux'
import { graphql, gql } from 'react-apollo'
import * as CommunitySelectors from '~client/community/selectors'

import Container from './container'

const allActivistsQuery = gql`
  query allActivists ($communityId: Int) {
    allActivists (condition: { communityId: $communityId }) {
      totalCount,
      nodes {
        id,
        name,
        email,
        phone
      }
    }
  }
`

const WithActivistsQuery = graphql(allActivistsQuery, {
  options: (props) => ({
    variables: {
      communityId: props.communityId
    }
  }),
  props: ({ data: { loading, allActivists } }) => ({
    loading,
    data: allActivists ? allActivists.nodes : [],
    totalCount: allActivists ? allActivists.totalCount : 0
  })
})

const mapStateToProps = (state) => ({
  communityId: CommunitySelectors.getCurrentId(state)
})

export default connect(mapStateToProps)(
  WithActivistsQuery(Container)
)

