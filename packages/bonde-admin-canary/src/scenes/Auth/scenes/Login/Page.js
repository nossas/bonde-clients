import React from 'react'
import { Mutation } from 'react-apollo'
import { AuthAPI } from '../../../../services/auth' 
import AUTHENTICATE from './authenticate.graphql'

import {
  Button,
  Container,
  Checkbox,
  Flexbox2 as Flexbox,
  FormField,
  Input,
  Link,
  Title
} from 'bonde-styleguide'

import Form, { Field, SubmissionError } from '../../../../components/Form'
import { isEmail, isEmpty } from '../../../../services/validations'

const AuthLogin = () => (
  <Container>
    <Title.H1 margin={{ bottom: 37 }}>
      O Bonde tá na área!
      Chega mais.
    </Title.H1>
    <Mutation mutation={AUTHENTICATE}>
      {(authenticate, { data }) => (
        <Form
          onSubmit={(values) => authenticate({
              variables: {
                email: values.email,
                password: values.password
              }
            })
            .then(({ data }) => {
              throw new SubmissionError({ _error: 'authentication is fail.' })
              AuthAPI.login(data)
            })
          }
        >
          <Field
            name='email'
            label='Email'
            placeholder='seuemail@exemplo.com'
            component={FormField}
            inputComponent={Input}
            validate={(value) => {
              if (isEmpty(value)) return 'Required Field'
              else if (!isEmail(value)) return 'Invalid email'
            }}
          />
          <Field
            name='password'
            type='password'
            placeholder='sua senha'
            label='Senha' 
            component={FormField}
            inputComponent={Input}
            validate={value => isEmpty(value) && 'Required field'}
          />
          <Flexbox spacing='between' padding='0 0 24px'>
            <Checkbox>Continuar conectadx</Checkbox>
            <Link
              href='#esqueci-a-senha'
              title='Esqueci a senha'
            >
              Esqueci a senha
            </Link> 
          </Flexbox>
          <Flexbox middle spacing='between'>
            <Link
              href='#criar-conta'
              title='Criar conta'
            >
              Criar conta
            </Link>
            <Button type='submit'>Partiu</Button>
          </Flexbox>
        </Form>
      )}
    </Mutation>
  </Container>
)

export default AuthLogin
