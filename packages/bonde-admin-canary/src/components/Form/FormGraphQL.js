import React from 'react'
import { Mutation } from 'react-apollo'
import { Form, SubmissionError } from './'

const FormGraphQL = ({
  children,
  mutation,
  update,
  onSubmit,
  ...props
}) => (
  <Mutation mutation={mutation} update={update}>
    {(mutationFunc) => (
      <Form
        onSubmit={(values) => {
          return onSubmit(values, mutationFunc)
            .catch((error) => {
              if (error && error.form) {
                throw new SubmissionError({ _error: error.form })
              } else if (error && error.fields) {
                throw new SubmissionError(error.fields)
              }
              console.error(error)
            })
        }}
        {...props}
      >
        {children}
      </Form>
    )}
  </Mutation>
)

export default FormGraphQL
