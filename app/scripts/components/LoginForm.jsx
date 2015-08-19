import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import reduxForm from 'redux-form'
import reactMixin from 'react-mixin'
import { Navigation } from 'react-router'
import classnames from 'classnames'

import * as Paths from '../Paths'
import * as AuthActions from './../actions/AuthActions'

function loginValidation(data) {
  const errors = { valid: true }
  if (!data.email) {
    errors.email = 'Informe o e-mail'
    errors.valid = false
  } else if (!/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i.test(data.email)) {
    errors.email = 'E-mail inválido'
    errors.valid = false
  }
  if (!data.password) {
    errors.password = 'Informe a senha'
    errors.valid = false
  }
  return errors
}

@connect(state => ({ auth: state.auth, form: state.loginForm }))
@reduxForm('loginForm', loginValidation)
@reactMixin.decorate(Navigation)
export default class LoginForm extends React.Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      auth: {
        submitting: false,
        error: null
      }
    }
  }

  static propTypes = {
    data: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleBlur: PropTypes.func.isRequired,
    touchAll: PropTypes.func.isRequired,
    valid: PropTypes.bool.isRequired
  }

  handleSubmit(event) {
    event.preventDefault()
    const { data, touchAll, valid, dispatch } = this.props
    this.setState({ auth: { submitting: true, error: null }})

    if (valid) {
      dispatch(AuthActions.login(data))
        .then(() => this.transitionTo(Paths.mobilizations()))
        .fail((state) => this.setState({ auth: state }))
    } else {
      touchAll()
      this.setState({ auth: { submitting: false } })
    }
  }

  renderErrorMessage() {
    if (this.state.auth.error) {
      return (
        <div className="h5 red bold center mt2 animated shake">{this.state.auth.error}</div>
      )
    }
  }

  render() {
    const {
      data: { email, password },
      errors: { email: emailError, password: passwordError },
      touched: { email: emailTouched, password: passwordTouched },
      handleChange,
      handleBlur
    } = this.props

    return (
      <form onSubmit={::this.handleSubmit} noValidate>

        <label htmlFor="email" className="block h5 caps bold mb1">E-mail</label>
        <input
          type="email" id="email"
          className={classnames("field-light", "block", "full-width", "mt1", "mb1", ((emailTouched && emailError) ? 'has-error' : null))}
          value={email}
          onChange={handleChange('email')}
          onBlur={handleBlur('email')} />
        <span className="h5 red bold">{emailTouched && emailError}</span>

        <label htmlFor="password" className="block h5 caps bold mt1 mb1">Senha</label>
        <input
          type="password" id="password"
          className={classnames("field-light", "block", "full-width", "mt1", "mb1", ((passwordTouched && passwordError) ? 'has-error' : null))}
          value={password}
          onChange={handleChange('password')}
          onBlur={handleBlur('password')} />
        <span className="h5 red bold">{passwordTouched && passwordError}</span>

        <input
          type="submit"
          className="button full-width bg-aqua mt2 p2"
          disabled={this.state.auth.submitting}
          value={this.state.auth.submitting ? "ENTRANDO..." : "ENTRAR"} />

        {::this.renderErrorMessage()}
      </form>
    )
  }
}
