import React, { PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import reactMixin from 'react-mixin'
import { Navigation } from 'react-router'
import classnames from 'classnames'

import * as Paths from '../Paths'
import { login } from './../actions/AuthActions'

import * as validation from '../../util/validation-helper'

@reactMixin.decorate(Navigation)
class LoginForm extends React.Component {

  componentWillReceiveProps(nextProps) {
    if(nextProps.user){
      this.transitionTo(Paths.mobilizations())
    }
  }

  render() {
    const { fields: { email, password }, handleSubmit, error, submitting } = this.props

    return (
      <form onSubmit={handleSubmit} noValidate>

        <label htmlFor="email" className="block h5 caps bold mb1">E-mail</label>
        <input
          type="email" id="email"
          className={classnames("field-light", "block", "full-width", "mt1", "mb1", ((email.touched && email.error) ? 'has-error' : null))}
          {...email}
        />
        {email.touched && email.error && <span className="h5 red bold">{email.error}</span>}

        <label htmlFor="password" className="block h5 caps bold mt1 mb1">Senha</label>
        <input
          type="password" id="password"
          className={classnames("field-light", "block", "full-width", "mt1", "mb1", ((password.touched && password.error) ? 'has-error' : null))}
          {...password}
        />
        {password.touched && password.error && <span className="h5 red bold">{password.error}</span>}

        <input
          type="submit"
          className="button full-width bg-aqua mt2 h3"
          disabled={submitting}
          value={submitting ? "ENTRANDO..." : "ENTRAR"} />

        {error && <div className="h5 red bold center mt2 animated shake">{error}</div>}
      </form>
    )
  }
}

LoginForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  error: PropTypes.string
}

const fields = ['email', 'password']

const validate = values => {
  const errors = {}
  if (!values.email) {
    errors.email = 'Informe o e-mail'
  } else if (!validation.isValidEmail(values.email)) {
    values.email = 'E-mail inválido'
  }
  if (!values.password) {
    errors.password = 'Informe a senha'
  }
  return errors
}

export default reduxForm({
  form: 'loginForm', fields, validate
},
(state, ownProps) => ({ // mapStateToProps
  user: state.auth.user
}), { onSubmit: login })(LoginForm)
