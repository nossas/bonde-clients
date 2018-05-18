import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { PrivateRoute } from './services/auth'
import { ProviderRedux } from './services/redux'
import { ProviderGraphQL } from './services/graphql'
import { ProviderLastLocation } from './services/router'
// Routes
import { Page as HomePage } from './scenes/Home'
import { Root as AuthRoot } from './scenes/Auth'
import { NotFound } from './components'

const Root = () => (
  <ProviderGraphQL>
    <ProviderRedux>
      <Router>
        <ProviderLastLocation>
          <Switch>
            <PrivateRoute exact path='/' component={HomePage} />
            <Route path='/auth' component={AuthRoot} />
            <Route component={NotFound} />
          </Switch>
        </ProviderLastLocation>
      </Router>
    </ProviderRedux>
  </ProviderGraphQL>
)

export default Root
