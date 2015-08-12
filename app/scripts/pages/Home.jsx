import React from 'react'
import LoginForm from './../components/LoginForm.jsx'

export default class Home extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="lg-col-6 mx-auto">
          <h1 className="center">Faça seu Login</h1>
          <LoginForm />
        </div>
      </div>
    )
  }
}
