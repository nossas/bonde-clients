import React from 'react'
import { Switch } from 'react-router-dom'
import { PublicRoute } from '../../services/auth'
import { NotFound } from '../../components'
import { Page as LoginPage } from './scenes/Login'
import { Page as RegisterPage } from './scenes/Register'

const AuthRoot = ({ match }) => (
  <Switch>
    <PublicRoute path={`${match.url}/login`} component={LoginPage} redirectTo='/' />
    <PublicRoute path={`${match.url}/register`} component={RegisterPage} />
    <PublicRoute component={NotFound} />
  </Switch>
)

export default AuthRoot
