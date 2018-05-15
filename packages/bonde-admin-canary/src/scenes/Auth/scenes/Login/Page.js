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
import { Field, SubmissionError } from '../../../../components/Form'
import { isEmail, isEmpty } from '../../../../services/validations'

const AuthLogin = () => (
  <FormGraphQL
    mutation={AUTHENTICATE}
    onSuccess={({ data }) => {
      throw new SubmissionError({
        _error: 'authentication is fail.'
      })
      // eslint-disable-next-line
      AuthAPI.login(data)
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
