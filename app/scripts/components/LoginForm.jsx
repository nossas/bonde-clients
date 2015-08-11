import React, { PropTypes } from 'react'
import { connect } from 'redux/react'
import reduxForm from 'redux-form'
import Auth from 'j-toker'
import * as Paths from '../Paths'
import reactMixin from 'react-mixin'
import { Navigation } from 'react-router'

function loginValidation(data) {
  const errors = {}

  if (!data.email) {
    errors.email = 'Informe o e-mail'
  } else if (!/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i.test(data.email)) {
    errors.email = 'E-mail inválido'
  }
  if (!data.password) {
    errors.password = 'Informe a senha'
  }

  return errors
}

@reactMixin.decorate(Navigation)
@connect(state => ({ form: state.login }))
@reduxForm('login', loginValidation)
export default class LoginForm extends React.Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      error: null
    }
  }

  static propTypes = {
    data: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    handleBlur: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    touchAll: PropTypes.func.isRequired,
    valid: PropTypes.bool.isRequired
  }

  handleSubmit(event) {
    this.setState({ error: null })
    event.preventDefault()
    const { data, touchAll, valid } = this.props

    if (valid) {
      Auth.emailSignIn(data).
        then(function(user){
          // TODO change this to mobilizations index when we have that page
          this.transitionTo(Paths.editMobilization(1))
        }.bind(this)).
        fail(function(error){
          this.setState({ error: error.reason })
        }.bind(this))
    } else {
      touchAll()
    }
  }

  renderErrorMessage() {
    if (this.state.error) {
      return (
        <div className="red mb2">{this.state.error}</div>
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
      <form onSubmit={::this.handleSubmit}>
        <label>Email</label>
        {emailError && emailTouched && <span className="red ml2">{emailError}</span>}
        <input
          type="email"
          className="field-light block full-width mb2"
          value={email}
          onChange={handleChange('email')}
          onBlur={handleBlur('email')} />

        <label>Senha</label>
        {passwordError && passwordTouched && <span className="red ml2">{passwordError}</span>}
        <input
          type="password"
          className="field-light block full-width mb2"
          value={password}
          onChange={handleChange('password')}
          onBlur={handleBlur('password')} />

        {::this.renderErrorMessage()}

        <input type="submit" className="button right" value="Entrar" />
      </form>
    )
  }
}
