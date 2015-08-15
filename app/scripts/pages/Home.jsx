import React from 'react'
import LoginForm from './../components/LoginForm.jsx'

export default class Home extends React.Component {
  render() {
    let bgImage = require('./bg-login.png')
    return (
      <div className="absolute left-0 top-0 right-0 bottom-0 py4 bg-gray bg-cover bg-center"
        style={{backgroundImage: 'url(' + bgImage + ')'}}>

        <div className="container py4">
          <div className="p3 bg-white border rounded lg-col-6 mx-auto">
            <h1 className="center mt1 mb3">Faça seu Login</h1>
            <LoginForm {...this.props} />
          </div>
        </div>
      </div>
    )
  }
}
