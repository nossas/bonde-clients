import React from 'react'
import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo'
import GenericReduxForm from './GenericReduxForm'

const GenericMutationForm = ({
  mutation,
  variables,
  refetchQueries,
  updateQuery,
  ...rest
}) => {
  const mutationProps = { mutation, refetchQueries }
  if (updateQuery && refetchQueries) {
    mutationProps.update = (cache, { data }) => {
      const { query, variables } = refetchQueries[0]
      const readQuery = () => cache.readQuery({ query, variables })
      const writeQuery = (writeData) => {
        cache.writeQuery({ query, data: writeData })
      }
      // updateQuery receive a readQuery on cache, writeQuery on cache and returning data
      updateQuery(readQuery, writeQuery, data)
    }
  }

  return (
    <Mutation {...mutationProps}>
      {(action) => (
        <GenericReduxForm
          {...rest}
          onSubmit={values => {
            // Return a Promise to
            return action({ variables: { ...variables, ...values } })
          }}
        />
      )}
    </Mutation>
  )
}

const { arrayOf, func, object, shape } = PropTypes

GenericMutationForm.propTypes = {
  mutation: func.isRequired,
  variables: object,
  updateQuery: func,
  refetchQueries: arrayOf(shape({
    query: func,
    variables: object
  }))
}

GenericMutationForm.defaultProps = {
  variables: {}
}

export default GenericMutationForm
