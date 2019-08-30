import React from 'react'
import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo'
import { SubmissionError } from 'redux-form'
import GenericReduxForm from './GenericReduxForm'

const GenericMutationForm = ({
  mutation,
  variables,
  refetchQueries,
  updateQuery,
  onSuccess,
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
              .then(onSuccess)
              .catch((error) => {
                if (error && (error.form || error.fields)) {
                  let errors = {}
                  if (error.form) {
                    errors = { _error: error.form }
                  }
                  if (error.fields) {
                    errors = { ...errors, ...error.fields }
                  }
                  throw new SubmissionError(errors)
                }
              })
          }}
        />
      )}
    </Mutation>
  )
}

const { arrayOf, func, object, shape, oneOfType } = PropTypes

GenericMutationForm.propTypes = {
  mutation: oneOfType([func, object]).isRequired,
  variables: object,
  updateQuery: func,
  refetchQueries: arrayOf(shape({
    query: func,
    variables: object
  })),
  onSuccess: func,
}

GenericMutationForm.defaultProps = {
  variables: {}
}

export default GenericMutationForm
