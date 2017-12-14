import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import '~client/styles/main.scss'

import { TechnicalIssues } from '~client/components/error/index.js'
import PrivateRoute from '~root/routes-v1/private-route'

import AccountLogin from '~routes/admin/not-authenticated/account-login/page.connected'
import CommunityList from '~routes/admin/authenticated/external/community-list/page.connected'
import MobilizationsList from '~routes/admin/authenticated/sidebar/mobilizations-list/page.connected'
import MobilizationsEdit from '~routes/admin/authenticated/sidebar/mobilizations-edit/page.connected'

import { withBackground, withUser, withSidebar } from '~root/routes-v1/hocs'

const About = () => (
  <div>
    <h2>About</h2>
  </div>
)

const AuthExample = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path='/login' component={withBackground(AccountLogin)} />
        <PrivateRoute exact path='/' component={withUser(MobilizationsList)} />
        <PrivateRoute exact path='/community' component={withUser(CommunityList)} />
        <PrivateRoute exact path='/mobilizations' component={withUser(withSidebar(MobilizationsList))} />
        <PrivateRoute exact path='/mobilizations/:mobilization_id/edit' component={withUser(withSidebar(MobilizationsEdit))} />
        <PrivateRoute exact path='/hello' component={About} />
        <Route component={TechnicalIssues} />
      </Switch>
    </div>
  </Router>
)

export default AuthExample
