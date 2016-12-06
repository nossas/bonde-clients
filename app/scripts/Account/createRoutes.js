import React from 'react'
import { Route } from 'react-router'

import { LoginRegisterContainer } from './containers'
import { EditUserPage, LoginPage, LogoutPage, RegisterPage } from './pages'


export default (store, AccountContainer) => [
  <Route key="account" component={LoginRegisterContainer}>
    <Route path="/login" component={LoginPage} />
    <Route path="/logout" component={LogoutPage} />
    <Route path="/register" component={RegisterPage} />
  </Route>,
  <Route key="account-logged" path="/account" component={AccountContainer} onEnter={AccountContainer.onEnter(store)}>
    <Route path="/edit" component={EditUserPage} />
  </Route>
]
