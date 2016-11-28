import React, { PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import reactMixin from 'react-mixin'
import { Navigation } from 'react-router'
import classnames from 'classnames'

import * as Paths from '../Paths'
import { login } from './../actions/AuthActions'
import { isValidEmail } from '../../util/validation-helper'

@reactMixin.decorate(Navigation)
class LoginForm extends React.Component {

  componentWillReceiveProps(nextProps) {
    if(nextProps.auth.user){
      this.transitionTo(Paths.mobilizations())
    }
  }

  render() {
    const { fields: { email, password }, handleSubmit, error, submitting, className } = this.props

    return (
      <form
        className={classnames('form', className)}
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="bg-white rounded-top">
          <div className="form-group">
            <label htmlFor="email">
              Seu email
              <span className="error">{email.touched && email.error}</span>
            </label>
            <input
              id="email"
              type="email"
              className={classnames(
                'input block lightestgray',
                email.touched && email.error ? 'has-error' : null
              )}
              placeholder="exemplo@email.com"
              {...email}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              Senha
              <span className="error">{password.touched && password.error}</span>
            </label>
            <input
              id="password"
              type="password"
              className="input"
              placeholder="••••••••••"
              {...password}
            />
          </div>
        </div>

        <input
          type="submit"
          className="btn white bg-pagenta col-12 rounded-bottom py2 caps"
          disabled={submitting}
          value={submitting ? "Entrando..." : "Entrar"}
        />

        {error && <div className="h5 h5 white bold center mt2 animated shake">{error}</div>}
      </form>
    )
  }
}

LoginForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  error: PropTypes.string,
  className: PropTypes.string
}

const fields = ['email', 'password']

const validate = values => {
  const errors = {}
  if (!values.email) {
    errors.email = 'Informe seu email'
    errors.valid = false
  } else if (!isValidEmail(values.email)) {
    errors.email = 'Email inválido'
    errors.valid = false
  }
  if (!values.password) {
    errors.password = 'Informe sua senha'
    errors.valid = false
  }
  return errors
}

export default reduxForm({
  form: 'loginForm', fields, validate
},
(state, ownProps) => ({ // mapStateToProps
  auth: state.auth
}), { onSubmit: login })(LoginForm)
