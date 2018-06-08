import React from 'react'
import { Mutation } from 'react-apollo'

const MutationHOC = ({ loading: Loading, mutation, props, init }) => (Component) => (ownProps) => (
  <Mutation mutation={mutation}>
    {(mutate, { data, loading }) => {
      if (loading && Loading) return <Loading />

      return typeof props === 'function'
        ? <Component mutate={mutate} {...props({ loading, data })} {...ownProps} />
        : <Component mutate={mutate} loading={loading} data={data} {...ownProps} />
    }}
  </Mutation>
)

export default MutationHOC
