import React from 'react'
import TopMenu from './../../components/TopMenu.jsx'
import LoginForm from './../../components/LoginForm.jsx'

export default class Login extends React.Component {
  render() {
    const rebooLogo = require("./reboo-logo-login.png");
    return (
      <div className="py4">
        <div className="container py4">
          <div className="px3 py3 center lg-col-6 mx-auto">
            <img src={rebooLogo} alt="Logo Reboo" />
          </div>
          <div className="px3 bg-white lg-col-6 mx-auto">
            <h1 className="center h2 m0 py2">Faça seu Login</h1>
          </div>
          <div className="p3 bg-silver lg-col-6 mx-auto">
            <LoginForm {...this.props} />
          </div>
        </div>
      </div>
    )
  }
}
