import React from 'react'
import { Mutation } from 'react-apollo'
import { Container, Title } from 'bonde-styleguide'
import Form from '../../../../components/Form'

const FormGraphQL = ({
  children,
  mutation, 
  onSuccess,
  onFail,
  parseValues
}) => {
  return (
    <Container>
      <Title.H1 margin={{ bottom: 37 }}>
        O Bonde tá na área!
        Chega mais.
      </Title.H1>
      <Mutation mutation={mutation}>
        {(mutationFunc) => (
          <Form
            onSubmit={(values) => {
              return mutationFunc({
                variables: parseValues ? parseValues(values) : values
              })
              .then(onSuccess)
              .catch(onFail)
            }}
          >
            {children}
          </Form>
        )}
      </Mutation>
    </Container>
  )
}

export default FormGraphQL
