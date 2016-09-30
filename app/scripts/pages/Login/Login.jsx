import React from 'react'

import LoginForm from './../../components/LoginForm.jsx'

import logo from './logo-nossas.svg'
import './login.scss'

const Login = props => (
  <div className="bg-cover bg-center bg-reboo absolute top-0 right-0 bottom-0 left-0">
    <div className="table col-3 mx-auto full-height">
      <div className="table-cell align-middle">
        <div className="col-8 mb3 mx-auto">
          <img src={logo} alt="Logo Nossas" />
        </div>
        <LoginForm className="col-12 mx-auto" {...props} />
      </div>
    </div>
  </div>
)

export default Login
