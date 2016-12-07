import React from 'react'
import { Route } from 'react-router'

import { LoginRegisterContainer } from './containers'
import {
  EditUserPage,
  LoginPageWrapper,
  LogoutPage,
  RegisterPage
} from './pages'


export default (store, AccountContainer, redirect_uri) => [
  <Route key="account" component={LoginRegisterContainer}>
    <Route path="/login" component={LoginPageWrapper(redirect_uri)} />
    <Route path="/logout" component={LogoutPage} />
    <Route path="/register" component={RegisterPage} />
  </Route>,
  <Route key="account-logged" path="/account" component={AccountContainer} onEnter={AccountContainer.onEnter(store)}>
    <Route path="/edit" component={EditUserPage} />
  </Route>
]
