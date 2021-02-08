import React from 'react'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import DevTools from 'components/dev-tools'
import { TechnicalIssues } from 'components/error/index'
import { ZendeskWidget } from 'components/external-services'
import { GoogleFontsLoader } from 'components/fonts'
import SubscriptionEditPage from './public/subscription-edit'
import LoggedRoute from './admin'

import 'styles/main.scss'
import 'react-toastify/dist/ReactToastify.css'

const AuthExample = () => (
  <div>
    <Router>
      <Switch>
        <Redirect from='/register' to='/' />
        <Route exact path='/subscriptions/:id/edit' component={SubscriptionEditPage} />
        <Route path='/' component={LoggedRoute} />
        <Route component={TechnicalIssues} />
      </Switch>
    </Router>
    {process.env.NODE_ENV !== 'production' ? <DevTools /> : <div></div>}
    <ZendeskWidget />
    <ToastContainer />
    <GoogleFontsLoader fonts='Source Sans Pro' />
  </div>
)

export default AuthExample
