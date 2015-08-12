import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
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

@connect(state => ({ form: state.login }))
@reduxForm('login', loginValidation)
@reactMixin.decorate(Navigation)
export default class LoginForm extends React.Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      submitting: false,
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
    this.setState({ submitting: true, error: null })
    event.preventDefault()
    const { data, touchAll, valid } = this.props

    if (valid) {
      Auth.emailSignIn(data).
        then(function(user){
          // TODO change this to mobilizations index when we have that page
          this.transitionTo(Paths.editMobilization(1))
        }.bind(this)).
        fail(function(error){
          this.setState({ submitting: false, error: error.reason })
        }.bind(this))
    } else {
      touchAll()
      this.setState({ submitting: false })
    }
  }

  renderErrorMessage() {
    if (this.state.error) {
      return (
        <div className="red center mt2">{this.state.error}</div>
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
      <form onSubmit={::this.handleSubmit} className="mt2">

        <label className="bold">E-MAIL</label>
        {emailError && emailTouched && <span className="red ml2">{emailError}</span>}
        <input
          type="email"
          className="field-light block full-width mt1 mb2"
          style={{height: '44px'}}
          value={email}
          onChange={handleChange('email')}
          onBlur={handleBlur('email')} />

        <label className="bold">SENHA</label>
        {passwordError && passwordTouched && <span className="red ml2">{passwordError}</span>}
        <input
          type="password"
          className="field-light block full-width mt1 mb2"
          style={{height: '44px'}}
          value={password}
          onChange={handleChange('password')}
          onBlur={handleBlur('password')} />

        <input
          type="submit"
          className="button full-width bg-blue mt1"
          style={{height: '44px'}}
          disabled={this.state.submitting}
          value={this.state.submitting ? "ENTRANDO..." : "ENTRAR"} />

        {::this.renderErrorMessage()}
      </form>
    )
  }
}
