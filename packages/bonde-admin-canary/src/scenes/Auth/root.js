import React from 'react'
import { Container } from 'bonde-styleguide'
import { Route } from 'services/auth'
import Login from './scenes/Login'
import ForgetPassword from './scenes/ForgetPassword'
import ResetPassword from './scenes/ResetPassword'
import Register from './scenes/Register'
import PropTypes from 'prop-types'

const AuthRoot = ({ match }) => (
  <Container>
    <Route
      path={`${match.url}/login`}
      component={Login}
    />
    <Route
      path={`${match.url}/forget-password`}
      component={ForgetPassword}
    />
    <Route
      path={`${match.url}/reset-password/:token`}
      component={ResetPassword}
    />
    <Route
      path={`${match.url}/register/:code`}
      component={Register}
    />
  </Container>
)

AuthRoot.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string
  })
}

export default AuthRoot
