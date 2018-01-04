import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import DevTools from '~client/components/dev-tools'
import '~client/styles/main.scss'

import { TechnicalIssues } from '~client/components/error/index.js'
import PrivateRoute from '~root/routes-v1/private-route'

// Background Container
import LoginPage from '~routes/admin/not-authenticated/account-login/page.connected'
import RegisterPage from '~routes/admin/not-authenticated/account-register/page.connected'

// User Container
import CommunityListPage from '~routes/admin/authenticated/external/community-list/page.connected'
import CommunityCreatePage from '~routes/admin/authenticated/external/community-new/page.connected'

// Sidebar Container
import Logout from '~routes/admin/authenticated/logout/page.connected.js'

// Sidebar Container
import Sidebar from './subroutes/sidebar'
import { withUser } from '~root/routes-v1/hocs'

const AuthExample = () => (
  <div>
    <Router>
      <Switch>
        <Route exact path='/login' component={LoginPage} />
        <Route exact path='/register' component={RegisterPage} />
        <PrivateRoute exact path='/logout' component={Logout} />
        <PrivateRoute exact path='/communities' component={withUser(CommunityListPage)} />
        <PrivateRoute exect path='/communities/new' component={withUser(CommunityCreatePage)} />
        <PrivateRoute path='/' component={withUser(Sidebar)} />
        <Route component={TechnicalIssues} />
      </Switch>
    </Router>
    <DevTools />
  </div>
)

export default AuthExample
