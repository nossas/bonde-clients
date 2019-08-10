import React from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import { allUserCommunitiesQuery } from 'scenes/Dashboard/graphql'

const UserCommunities = ({ loading: Loading, component: Component, ...rest }) => (
  <Query query={allUserCommunitiesQuery} variables={{ orderBy: 'UPDATED_AT_DESC' }}>
    {({ data, loading, error }) => {
      if (loading && Loading) return <Loading />
      if (error) return <span>{error}</span>

      const communities = data && data.allUserCommunities ? data.allUserCommunities.nodes : []
      return (
        <Component
          communities={communities}
          loading={loading}
          {...rest}
        />
      )
    }}
  </Query>
)

UserCommunities.propTypes = {
  loading: PropTypes.any,
  component: PropTypes.any
}

export default UserCommunities
