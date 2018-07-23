import React from 'react'
import { Container } from 'bonde-styleguide'
import { Route } from  'services/auth'
import Login from './scenes/Login'
import Register from './scenes/Register'
import ForgetPassword from './scenes/ForgetPassword'

const AuthRoot = ({ match }) => (
  <Container>
    <Route
      path={`${match.url}/login`}
      component={Login}
    />
    <Route
      path={`${match.url}/register`}
      component={Register}
    />
    <Route
      path={`${match.url}/forget-password`}
      component={ForgetPassword}
    />
  </Container>
)

export default AuthRoot
