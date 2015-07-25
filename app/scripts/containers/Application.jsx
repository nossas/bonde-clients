import React from 'react'
import PubSub from 'pubsub-js'
import Auth from 'j-toker'
import $ from 'jquery'

// Components
import MainMenu from './../components/MainMenu.jsx'

Auth.configure({
  apiUrl: process.env.BASE_URL,
  handleTokenValidationResponse: function(resp) {
    // https://github.com/lynndylanhurley/j-toker/issues/10
    PubSub.publish("auth.validation.success", resp.data)
    return resp.data
  }
})

$.ajaxSetup({beforeSend: Auth.appendAuthHeaders})
$(document).ajaxComplete(Auth.updateAuthCredentials)

export default class Application extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      user: Auth.user
    }
  }

  componentWillMount() {
    PubSub.subscribe('auth', function() {
      this.setState({user: Auth.user})
    }.bind(this))
  }

  render() {
    return(
      <div>
        <MainMenu />
        {this.props.children &&
          React.cloneElement(this.props.children, {user: this.state.user})}
      </div>
    )
  }
}
