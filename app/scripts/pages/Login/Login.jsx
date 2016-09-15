import React from 'react'
import LoginForm from './../../components/LoginForm.jsx'

export default class Login extends React.Component {
  render() {
    const rebooLogo = require('./logo-login.png')
    return (
      <div className="bg-cover bg-center bg-reboo absolute top-0 right-0 bottom-0 left-0">
        <div className="table col-3 mx-auto" style={{ height: '100%' }}>
          <div className="table-cell align-middle">
            <div className="col-12 center">
              <img src={rebooLogo} alt="Logo Reboo" />
            </div>
            <LoginForm className="col-12 mx-auto" {...this.props} />
          </div>
        </div>
      </div>
    )
  }
}
