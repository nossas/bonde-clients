import React from 'react'
import { Route } from 'react-router'

import { LoginRegisterContainer } from './containers'
import { RegisterPage } from './pages'

export default (
  <Route component={LoginRegisterContainer}>
    <Route path="/register" component={RegisterPage} />
  </Route>
)
