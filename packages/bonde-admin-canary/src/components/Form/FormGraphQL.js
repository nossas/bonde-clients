import React from 'react'
import { Mutation } from 'react-apollo'
import { toast } from 'react-toastify'
import { Form, SubmissionError, resetForm } from './'
import PropTypes from 'prop-types'

const FormGraphQL = ({
  children,
  mutation,
  update,
  refetchQueries,
  onSubmit,
  name,
  ...props
}) => {
  return (
    <Mutation mutation={mutation} update={update} refetchQueries={refetchQueries}>
      {(mutationFunc) => (
        <Form
          name={name}
          onSubmit={(values) => {
            return onSubmit(values, mutationFunc)
              .then(() => {
                resetForm(name)
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
}

FormGraphQL.propTypes = {
  name: PropTypes.string.isRequired,
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
      cache: onCache,
      onSuccess,
      onError
    } = this.props

    let updateProps = {}
    if (query && onCache) {
      updateProps = {
        update: (cache, { data }) => {
          const readQuery = () => cache.readQuery({
            query,
            variables: { ...queryVariables }
          })
          const writeQuery = (writeData) => {
            cache.writeQuery({ query, data: writeData })
          }
          onCache(readQuery, writeQuery, data)
        },
        refetchQueries: [{
          query,
          variables: { ...queryVariables }
        }]
      }
    }

    return (
      <FormGraphQL
        name={this.props.name}
        {...updateProps}
        mutation={mutation}
        onSubmit={(values, mutationPromise) => {
          const variables = { ...mutationVariables, ...values }
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

const { func, node, object, oneOfType, string } = PropTypes

FormGraphQLv2.propTypes = {
  name: string.isRequired,
  children: node,
  mutation: oneOfType([func, object]).isRequired,
  mutationVariables: object,
  query: oneOfType([func, object]),
  queryVariables: object,
  cache: func,
  onSuccess: func,
  onError: func
}

FormGraphQLv2.defaultProps = {
  mutationVariables: {},
  queryVariables: {},
  onError: (err) => {
    // eslint-disable-next-line no-console
    console.error(err)
    toast('Houve um problema com a requisição')
  }
}
