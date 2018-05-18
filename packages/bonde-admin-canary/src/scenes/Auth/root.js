import React from 'react'
import { Switch } from 'react-router-dom'
import { PublicRoute, PrivateRoute } from '../../services/auth'
import { NotFound } from '../../components'
import { Page as LoginPage } from './scenes/Login'
import { Page as RegisterPage } from './scenes/Register'
import { Page as TagsPage } from './scenes/Tags'

const AuthRoot = ({ match }) => (
  <Switch>
    <PublicRoute path={`${match.url}/login`} component={LoginPage} redirectTo='/' />
    <PublicRoute path={`${match.url}/register`} component={RegisterPage} redirectTo='/auth/tags' />
    <PrivateRoute path={`${match.url}/tags`} component={TagsPage} redirectTo='/' />
    <PublicRoute component={NotFound} />
  </Switch>
)

export default AuthRoot
