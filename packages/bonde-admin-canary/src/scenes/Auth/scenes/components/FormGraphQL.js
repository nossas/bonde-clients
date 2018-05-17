import React from 'react'
import { Mutation } from 'react-apollo'
import { Container, Title } from 'bonde-styleguide'
import Form, { SubmissionError } from '../../../../components/Form'

const FormGraphQL = ({
  children,
  mutation, 
  onSubmit
}) => (
  <Container>
    <Title.H1 margin={{ bottom: 37 }}>
      O Bonde tá na área!
      Chega mais.
    </Title.H1>
    <Mutation mutation={mutation}>
      {(mutationFunc) => (
        <Form
          onSubmit={(values) => {
            return onSubmit(values, mutationFunc)
              .catch((error) => {
                if (error && error.formError) {
                  throw new SubmissionError({ _error: error.formError })
                }
                console.error(error)
              })
          }}
        >
          {children}
        </Form>
      )}
    </Mutation>
  </Container>
)

export default FormGraphQL
