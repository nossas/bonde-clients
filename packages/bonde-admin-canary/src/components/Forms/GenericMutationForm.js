import React from 'react'
import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo'
import { SubmissionError } from 'redux-form'
import { toast } from 'react-toastify'
import GenericReduxForm from './GenericReduxForm'

const catchErrors = (errorsMap) => (errors) => {
  if (typeof errors === 'object') {
    const errorCode = errors.message.replace('GraphQL error: ', '')
    const errorMessage = errorsMap[errorCode]

    if (errorMessage) throw new SubmissionError(errorMessage)
  }
}

const GenericMutationForm = ({
  mutation,
  variables,
  refetchQueries,
  updateQuery,
  onSuccess,
  parse,
  errors,
  onError,
  ...rest
}) => {
  const mutationProps = { mutation, refetchQueries }
  if (updateQuery && refetchQueries) {
    mutationProps.update = (cache, { data }) => {
      const { query, variables: queryVariables } = refetchQueries[0]
      const readQuery = () => cache.readQuery({ query, variables: queryVariables })
      const writeQuery = (writeData) => {
        cache.writeQuery({ query, data: writeData })
      }
      // updateQuery receive a readQuery on cache, writeQuery on cache and returning data
      updateQuery(readQuery, writeQuery, data)
    }
  }

  const handleError = onError || catchErrors(errors)
  /*! !onError ? onError :  (error) => {
    // TODO: resolve this error pattern
     "errors": [
      {
        "extensions": {
          "path": "$.selectionSet.insert_chatbot_campaigns.args.objects",
          "code": "permission-error"
        },
        "message": "Check constraint violation. insert check constraint failed"
      }
    ]
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
    return Promise.reject(error)
  } */

  return (
    <Mutation {...mutationProps}>
      {(action) => (
        <GenericReduxForm
          {...rest}
          onSubmit={values => {
            const mutationProps = {
              variables: { ...variables, ...values }
            }
            if (parse) {
              mutationProps.variables = {
                ...mutationProps.variables,
                ...parse(values)
              }
            }
            return action(mutationProps)
              .then((args) => {
                if (typeof onSuccess === 'string') {
                  toast(onSuccess, { type: toast.TYPE.SUCCESS })
                  return Promise.resolve(args)
                }
                return onSuccess(args)
              })
              .catch(handleError)
          }}
        />
      )}
    </Mutation>
  )
}

const { arrayOf, func, object, shape, string, oneOfType } = PropTypes

GenericMutationForm.propTypes = {
  mutation: oneOfType([func, object]).isRequired,
  variables: object,
  /* function to parsed variables before mutation is called. */
  parse: func,
  updateQuery: func,
  refetchQueries: arrayOf(shape({
    query: oneOfType([func, object]),
    variables: object
  })),
  onSuccess: oneOfType([func, string]),
  onError: func,
  errors: object
}

GenericMutationForm.defaultProps = {
  variables: {},
  onSuccess: 'Salvo com sucesso!',
  errors: {}
}

export default GenericMutationForm
