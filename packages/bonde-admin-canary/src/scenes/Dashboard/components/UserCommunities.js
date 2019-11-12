import React from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import { allUserCommunitiesQuery } from 'scenes/Dashboard/graphql'

const UserCommunities = ({ loading: Loading, component: Component, ...rest }) => {
  return (
    <Query query={allUserCommunitiesQuery}>
      {({ data, loading, error }) => {
        if (loading && Loading) return <Loading />
        if (error) return <span>{error}</span>

        const communities = data && data.communities ? data.communities : []
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
}

UserCommunities.propTypes = {
  loading: PropTypes.any,
  component: PropTypes.any
}

export default UserCommunities
