import React from 'react'
import Auth from 'j-toker'
import * as Paths from '../Paths'
import reactMixin from 'react-mixin'
import { Navigation } from 'react-router'
import { addons } from 'react/addons'
const { LinkedStateMixin } = addons

@reactMixin.decorate(Navigation)
@reactMixin.decorate(LinkedStateMixin)
export default class LoginForm extends React.Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      email: null,
      password: null,
      errors: {}
    }
  }

  validateForm() {
    let errors = {}

    if (!this.state.email) {
      errors.email = 'Informe o e-mail.'
    } else if (!this.state.password) {
      errors.password = 'Informe a senha.'
    }

    this.setState({ errors: errors })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.validateForm()

    if (Object.keys(this.state.errors).length === 0) {
      Auth.emailSignIn(this.state).
        then(function(user){
          // TODO change this to mobilizations index when we have that page
          this.transitionTo(Paths.editMobilization(1))
        }.bind(this)).
        fail(function(error){
          this.handleLoginError(error.reason)
        }.bind(this))
    }
  }

  handleLoginError(error) {
    this.setState({ errors: { general: error } })
  }

  renderErrorMessage() {
    if (this.state.errors) {
      return (
        <div className="red mb2">{this.state.errors}</div>
      )
    }
  }

  render() {
    return (
      <form onSubmit={::this.handleSubmit}>
        <label>Email</label>
        <span className="red ml2">{this.state.errors.email}</span>
        <input
          type="email"
          className="field-light block full-width mb2"
          valueLink={this.linkState('email')} />

        <label>Senha</label>
        <span className="red ml2">{this.state.errors.password}</span>
        <input
          type="password"
          className="field-light block full-width mb2"
          valueLink={this.linkState('password')} />

        <div className="red mb2">{this.state.errors.general}</div>

        <input type="submit" className="button right" value="Entrar" />
      </form>
    )
  }
}
