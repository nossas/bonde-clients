import React from 'react'
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { ProviderRedux } from './services/redux'
import { ProviderGraphQL } from './services/graphql'
import { ProviderLastLocation } from './services/router'
import { SessionProvider, PrivateRoute, PublicRoute, Route } from './services/auth'
// Routes
import Dashboard from './scenes/Dashboard'
import { Root as AuthRoot } from './scenes/Auth'
import { NotFound } from './components'
// Styles
import 'react-toastify/dist/ReactToastify.css'

const Root = () => (
  <SessionProvider>
    <ProviderGraphQL>
      <ProviderRedux>
        <React.Fragment>
          <ToastContainer />
          <Router>
            <ProviderLastLocation>
              <Switch>
                <PublicRoute
                  path='/auth'
                  redirectTo='/admin'
                  component={AuthRoot}
                />

                <PrivateRoute
                  path='/admin'
                  redirectTo='/auth/login'
                  component={Dashboard}
                />

                <Redirect exact from='/' to='/admin' />

                <Route component={NotFound} />
              </Switch>
            </ProviderLastLocation>
          </Router>
        </React.Fragment>
      </ProviderRedux>
    </ProviderGraphQL>
  </SessionProvider>
)

export default Root
