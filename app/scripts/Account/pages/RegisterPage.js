import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'

import { FormRedux, FormGroup, ControlLabel, FormControl } from '../../Dashboard/Forms'


class RegisterPage extends Component {

  handleSubmit(values) {
    // TODO: Send values to API
    console.log(values)
  }

  render() {
    const { fields: { name, last_name, email, password, password2 }, handleSubmit } = this.props
    return (
      <div>
        <h1>Crie sua conta no Nossas.</h1>
        <form onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
          <div className="flex">
            <div className="form-group col-6">
              <label className="control-label">Nome</label>
              <input className="form-control" placeholder="Seu nome" type="text" {...name} />
            </div>
            <div className="form-group col-6">
              <label className="control-label">Sobrenome</label>
              <input className="form-control" placeholder="Sobrenome" type="text" {...last_name} />
            </div>
          </div>
          <div className="form-group">
            <label className="control-label">E-mail</label>
            <input className="form-control" placeholder="exemplo@email.com.br" type="email" {...email} />
          </div>
          <div className="form-group">
            <label className="control-label">Senha</label>
            <input className="form-control" placeholder="*********" type="password" {...password} />
          </div>
          <div className="form-group">
            <label className="control-label">Confirme sua senha</label>
            <input className="form-control" placeholder="*********" type="password" {...password2} />
          </div>
          <button className="btn white bg-pagenta col-12 rounded-bottom py2 caps">Criar conta</button>
        </form>
      </div>
    )
  }
}

RegisterPage.propTypes = {
  fields: PropTypes.object.isRequired
}

const fields = ['name', 'last_name']
const validate = values => {
  return {}
}

export default reduxForm({
  form: 'registerUser',
  fields,
  validate
})(RegisterPage)
