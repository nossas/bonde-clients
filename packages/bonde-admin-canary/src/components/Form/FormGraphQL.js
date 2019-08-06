import React from 'react'
import { Mutation } from 'react-apollo'
import { Form, SubmissionError, resetForm } from './'
import PropTypes from 'prop-types'

const FormGraphQL = ({
  children,
  mutation,
  update,
  refetchQueries,
  onSubmit,
  ...props
}) => (
  <Mutation mutation={mutation} update={update} refetchQueries={refetchQueries}>
    {(mutationFunc) => (
      <Form
        onSubmit={(values) => {
          return onSubmit(values, mutationFunc)
            .then(() => {
              resetForm()
              return Promise.resolve()
            })
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
        {...props}
      >
        {children}
      </Form>
    )}
  </Mutation>
)

FormGraphQL.propTypes = {
  children: PropTypes.node,
  mutation: PropTypes.object,
  update: PropTypes.func,
  refetchQueries: PropTypes.arrayOf(PropTypes.object),
  onSubmit: PropTypes.func
}

export default FormGraphQL

export class FormGraphQLv2 extends React.Component {
  render () {
    const {
      children,
      mutation,
      mutationVariables,
      query,
      queryVariables,
      cache,
      onSuccess,
      onError
    } = this.props

    let updateProps = {}
    if (query && cache) {
      updateProps = {
        update: (cache, { data }) => {
          const readQuery = () => cache.readQuery({
            query,
            variables: { ...queryVariables }
          })
          const writeQuery = (writeData) => {
            cache.writeQuery({ query, data: writeData })
          }
          cache(readQuery, writeQuery, data)
        },
        refetchQueries: [{
          query,
          variables: { ...queryVariables }
        }]
      }
    }

    return (
      <FormGraphQL
        {...updateProps}
        mutation={mutation}
        onSubmit={(values, mutationPromise) => {
          const variables = { ...values, ...mutationVariables }
          return mutationPromise({ variables })
            .then(onSuccess)
            .catch(onError)
        }}
      >
        {children}
      </FormGraphQL>
    )
  }
}

FormGraphQLv2.propTypes = {
  children: PropTypes.node,
  mutation: PropTypes.func.isRequired,
  mutationVariables: PropTypes.object,
  query: PropTypes.func,
  queryVariables: PropTypes.object,
  cache: PropTypes.func,
  onSuccess: PropTypes.func,
  onError: PropTypes.func
}

FormGraphQLv2.defaultProps = {
  mutationVariables: {},
  queryVariables: {}
}
