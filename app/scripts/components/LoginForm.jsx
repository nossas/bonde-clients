import React from 'react'
import Auth from 'j-toker'
var Navigation = require('react-router').Navigation
require('react/addons')

var LoginForm = React.createClass({
  mixins: [React.addons.LinkedStateMixin, Navigation],

  getInitialState: function(){
    return ({
      email: null,
      password: null
    })
  },

  onSubmit: function(e){
    e.preventDefault()
    Auth.emailSignIn(this.state).
      then(function(user){
        this.transitionTo('/dashboard/edit')
      }.bind(this)).
      fail(function(error){
        console.log(error)
      })
  },

  render: function(){
    return (
      <form onSubmit={this.onSubmit}>
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
})

module.exports = LoginForm
