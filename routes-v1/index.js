import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import DevTools from '~client/components/dev-tools'
import '~client/styles/main.scss'
import { TechnicalIssues } from '~client/components/error/index.js'

// Page
import LoginPage from '~routes/admin/not-authenticated/account-login/page.connected'
import RegisterPage from '~routes/admin/not-authenticated/account-register/page.connected'
import SubscriptionEditPage from '~routes/public/subscription-edit/page.connected'

// Route
import LoggedRoute from './subroutes/logged'

const AuthExample = () => (
  <div>
    <Router>
      <Switch>
        <Route exact path='/login' component={LoginPage} />
        <Route exact path='/register' component={RegisterPage} />
        <Route exact path='/subscriptions/:id/edit' component={SubscriptionEditPage} />
        <Route path='/' component={LoggedRoute} />
        <Route component={TechnicalIssues} />
      </Switch>
    </Router>
    <DevTools />
  </div>
)

export default AuthExample
