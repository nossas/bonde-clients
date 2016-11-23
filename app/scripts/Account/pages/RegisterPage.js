import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'

import { FormRedux, FormGroup, ControlLabel, FormControl } from '../../Dashboard/Forms'
import { isValidEmail } from '../../../util/validation-helper'


class RegisterPage extends Component {

  handleSubmit(values) {
    // TODO: Send values to API
    console.log(values)
  }

  render() {
    const { fields: { name, last_name, email, password, password2 }, ...formProps } = this.props
    return (
      <div>
        <h1>Crie sua conta no Nossas.</h1>
        <FormRedux className="rounded" onSubmit={this.handleSubmit.bind(this)} {...formProps}>
          <div className="flex">
            <FormGroup className="col-6" controlId="nameId" {...name}>
              <ControlLabel>Nome</ControlLabel>
              <FormControl type="text" placeholder="Seu nome" />
            </FormGroup>
            <FormGroup className="col-6" controlId="lastNameId" {...last_name}>
              <ControlLabel>Sobrenome</ControlLabel>
              <FormControl type="text" placeholder="Sobrenome" />
            </FormGroup>
          </div>
          <FormGroup controlId="emailId" {...email}>
            <ControlLabel>E-mail</ControlLabel>
            <FormControl type="email" placeholder="exemplo@email.com.br" />
          </FormGroup>
          <FormGroup controlId="passwordId" {...password}>
            <ControlLabel>Senha</ControlLabel>
            <FormControl type="password" placeholder="********" />
          </FormGroup>
          <FormGroup controlId="password2Id" {...password2}>
            <ControlLabel>Confirme sua senha</ControlLabel>
            <FormControl type="password" placeholder="********" />
          </FormGroup>
          <button type="submit" className="btn white bg-pagenta col-12 rounded-bottom py2 caps">Criar conta</button>
        </FormRedux>
      </div>
    )
  }
}

RegisterPage.propTypes = {
  // Injected by redux-form
  fields: PropTypes.object.isRequired
}

const fields = ['name', 'last_name', 'email', 'password', 'password2']
const validate = values => {
  const errors = {}
  if (!values.name) {
    errors.name = 'Informe seu nome'
  }
  if (!values.email) {
    errors.email = 'Informe seu e-mail'
  } else if (!isValidEmail(values.email)) {
    errors.email = 'E-mail inválido'
  }
  if (!values.password) {
    errors.password = 'Informe uma senha'
  }
  if (values.password && values.password !== values.password2) {
    errors.password2 = 'Senha não confere'
  }
  return errors
}

export default reduxForm({
  form: 'registerUser',
  fields,
  validate
})(RegisterPage)
