import React from 'react'
import { ToastContainer } from 'react-toastify'
import { createBrowserHistory } from 'history'
import { ProviderRedux } from './services/redux'
import { ProviderGraphQL } from './services/graphql'
import { Router, Redirect, Switch, ProviderLastLocation } from './services/router'
import { SessionProvider, PrivateRoute, PublicRoute, Route } from './services/auth'
// Routes
import Dashboard from './scenes/Dashboard'
import { Root as AuthRoot } from './scenes/Auth'
import { NotFound } from './components'
// Styles
import 'react-toastify/dist/ReactToastify.css'

const history = createBrowserHistory()

const Root = () => (
  <SessionProvider>
    <ProviderGraphQL>
      <ProviderRedux>
        <React.Fragment>
          <ToastContainer
            className='BondeToastify'
            hideProgressBar={true}
          />
          <Router history={history}>
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
