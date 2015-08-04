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
      password: null
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    Auth.emailSignIn(this.state).
      then(function(user){
        // TODO change this to mobilizations index when we have that page
        this.transitionTo(Paths.editMobilization(1))
      }.bind(this)).
      fail(function(error){
        console.log(error)
      })
  }

  render() {
    return (
      <form onSubmit={::this.handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          className="field-light block full-width mb2"
          valueLink={this.linkState('email')} />

        <label>Senha</label>
        <input
          type="password"
          className="field-light block full-width mb2"
          valueLink={this.linkState('password')} />

        <input type="submit" className="button right" value="Entrar" />
      </form>
    )
  }
}
