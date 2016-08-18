import React, { PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import reactMixin from 'react-mixin'
import { Navigation } from 'react-router'
import classnames from 'classnames'

import * as Paths from '../Paths'
import * as AuthActions from './../actions/AuthActions'

import * as validation from '../../util/validation-helper'


@reactMixin.decorate(Navigation)
class LoginForm extends React.Component {

  handleSubmit(event) {
    event.preventDefault()
    const { data, touchAll, valid, dispatch } = this.props

    if (valid)
      dispatch(AuthActions.login(data))
    else
      touchAll()
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.auth.user){
      this.transitionTo(Paths.mobilizations())
    }
  }

  renderErrorMessage() {
    if (this.props.auth.error) {
      return (
        <div className="h5 red bold center mt2 animated shake">{this.props.auth.error}</div>
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
          className="button full-width bg-aqua mt2 h3"
          disabled={this.props.auth.submitting}
          value={this.props.auth.submitting ? "ENTRANDO..." : "ENTRAR"} />

        {::this.renderErrorMessage()}
      </form>
    )
  }
}

LoginForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
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
  auth: state.auth
}))(LoginForm)
