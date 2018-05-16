import React from 'react'
import { AuthAPI } from '../../../../services/auth' 
import REGISTER from './register.graphql'

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

class AuthRegister extends React.Component { 

  state = { showPassword: false }

  render () {
    return (
      <FormGraphQL
        mutation={REGISTER}
        onSubmit={(values, mutation) => {
          return mutation({
            variables: { user: { data: JSON.stringify(values) } }
          })
          .then(({ data }) => {
            if (data.register && !data.register.jwtToken) {
              return Promise.reject({ formError: 'register is fail.' })
            }
            AuthAPI.login({ jwtToken: data.register.jwtToken })
            return Promise.resolve()
          })
        }}
      >
        <Flexbox colSize='49.1%' spacing='between'>
          <Field
            name='first_name'
            label='Nome'
            placeholder='Seu nome'
            component={FormField}
            inputComponent={Input}
            validate={value => isEmpty(value) && 'Required field'}
          />
          <Field
            name='last_name'
            placeholder='Seu sobrenome'
            label='Sobrenome' 
            component={FormField}
            inputComponent={Input}
            validate={value => isEmpty(value) && 'Required field'}
          />
        </Flexbox>
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
            type={!this.state.showPassword ? 'password' : 'text'}
            placeholder='******'
            label='Senha'
            hint='Minimun 6 characters'
            component={FormField}
            inputComponent={Input}
            validate={value => {
              if (isEmpty(value)) return 'Required field'
              else if (value.length < 6) return 'Minimun 6 characters'
            }}
          />
        <Flexbox vertical padding='0 0 24px'>
          <Checkbox
            checked={this.state.showPassword}
            onChange={() => this.setState({ showPassword: !this.state.showPassword })}
          >
            Mostrar senha
          </Checkbox>
          <Checkbox>Continuar conectadx</Checkbox> 
        </Flexbox>
        <Flexbox middle spacing='between'>
          <Link
            to='/auth/login'
            title='Já tenho conta'
          >
            Já tenho conta
          </Link>
          <Button type='submit'>Partiu</Button>
        </Flexbox>
      </FormGraphQL>
    )
  }
}
export default AuthRegister
