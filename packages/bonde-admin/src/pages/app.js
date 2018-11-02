import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import DevTools from '@/components/dev-tools'
import '@/styles/main.scss'
import { TechnicalIssues } from '@/components/error/index'
import { ZendeskWidget } from '@/components/external-services'
import { GoogleFontsLoader } from '@/components/fonts'
import NotificationSystem from '@/components/notification-system'

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
