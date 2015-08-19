import React from 'react'
import { TopMenu, LoginForm } from './../components'

export default class Login extends React.Component {
  render() {
    let bgImage = require('./bg-login.png')
    return (
      <div className="absolute left-0 top-0 right-0 bottom-0 bg-gray gray bg-cover bg-center"
        style={{backgroundImage: 'url(' + bgImage + ')'}}>
        <TopMenu />
        <div className="py4">
          <div className="container py4">
            <div className="px3 bg-white rounded-top lg-col-6 mx-auto">
              <h1 className="center m0 py2">Faça seu Login</h1>
            </div>
            <div className="p3 bg-silver rounded-bottom lg-col-6 mx-auto">
              <LoginForm {...this.props} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
