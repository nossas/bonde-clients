import React from 'react'
import { Query } from 'react-apollo'

const QueryHOC = ({ loading: Loading, query, props }) => (Component) => (ownProps) => (
  <Query query={query}>
    {({ loading, data }) => {
      if (loading && Loading) return <Loading />

      return typeof props === 'function'
        ? <Component {...props({ loading, data })} {...ownProps} />
        : <Component loading={loading} data={data} {...ownProps} />
    }}
  </Query>
)

export default QueryHOC
