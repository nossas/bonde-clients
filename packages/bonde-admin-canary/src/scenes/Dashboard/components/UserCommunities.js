import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import { allUserCommunitiesQuery } from 'scenes/Dashboard/graphql'

const UserCommunities = ({ loading: Loading, component: Component, ...rest }) => {
  const [offset, setOffset] = useState(0)
  return (
    <Query query={allUserCommunitiesQuery} variables={{ offset }}>
      {({ data, loading, error }) => {
        if (loading && Loading) return <Loading />
        if (error) return <span>{error}</span>

        // LIMIT OF QUERY HARD SET LIKE 20
        const communities = data && data.communities ? data.communities : []
        const count = data && data.communities_aggregate ? data.communities_aggregate.aggregate.count : 0

        return (
          <Component
            communities={communities}
            count={count}
            offset={offset}
            loading={loading}
            setOffset={setOffset}
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
