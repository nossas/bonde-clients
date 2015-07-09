import React from 'react'
import LoginForm from './../components/LoginForm.jsx'

export default class Home extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="lg-col-4">
          <h2>Login</h2>
          <LoginForm />
        </div>
      </div>
    )
  }
}
