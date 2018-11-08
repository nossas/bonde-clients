import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import DevTools from '~client/components/dev-tools'
import '~client/styles/main.scss'
import { TechnicalIssues } from '~client/components/error/index'
import { ZendeskWidget } from '~client/components/external-services'
import { GoogleFontsLoader } from '~client/components/fonts'
import NotificationSystem from '~client/components/notification-system'

import SubscriptionEditPage from './public/subscription-edit'
import LoggedRoute from './admin'

const AuthExample = () => (
  <div>
    <Router>
      <Switch>
        <Route exact path='/subscriptions/:id/edit' component={SubscriptionEditPage} />
        <Route path='/' component={LoggedRoute} />
        <Route component={TechnicalIssues} />
      </Switch>
    </Router>
    <DevTools />
    <ZendeskWidget />
    <NotificationSystem />
    <GoogleFontsLoader fonts='Source Sans Pro' />
  </div>
)

export default AuthExample
