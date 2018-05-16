import React from 'react'
import { AuthAPI } from '../../../../services/auth' 
import AUTHENTICATE from './authenticate.graphql'

import {
  Button,
  Checkbox,
  Flexbox2 as Flexbox,
  FormField,
  Input
} from 'bonde-styleguide'

import { FormGraphQL } from '../components'
import { Link } from '../../../../components'
import { Field } from '../../../../components/Form'
import { isEmail, isEmpty } from '../../../../services/validations'

const AuthLogin = () => (
  <FormGraphQL
    mutation={AUTHENTICATE}
    onSubmit={(values, mutation) => {
      return mutation({ variables: values })
        .then(({ data }) => {
          if (data.authenticate && !data.authenticate.jwtToken) {
            return Promise.reject({
              formError: 'OPS! Email ou senha incorretos.'
            })
          }
          AuthAPI
            .login({ jwtToken: data.authenticate.jwtToken })
          return Promise.resolve()
        })
    }}
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
        to='#esqueci-a-senha'
        title='Esqueci a senha'
      >
        Esqueci a senha
      </Link> 
    </Flexbox>
    <Flexbox middle spacing='between'>
      <Link
        to='/auth/register'
        title='Criar conta'
      >
        Criar conta
      </Link>
      <Button type='submit'>Partiu</Button>
    </Flexbox>
  </FormGraphQL>
)

export default AuthLogin
