import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import '~client/styles/main.scss'

import { TechnicalIssues } from '~client/components/error/index.js'
import PrivateRoute from '~root/routes-v1/private-route'
// -    Background Container
import AccountLogin from '~routes/admin/not-authenticated/account-login/page.connected'
import AccountRegister from '~routes/admin/not-authenticated/account-register/page.connected'
// --   User Container
import CommunityList from '~routes/admin/authenticated/external/community-list/page.connected'
import CommunityRegister from '~routes/admin/authenticated/external/community-new/page.connected'
// ---  Sidebar Container
import MobilizationsList from '~routes/admin/authenticated/sidebar/mobilizations-list/page.connected'
import MobilizationsEdit from '~routes/admin/authenticated/sidebar/mobilizations-edit/page.connected'
import Logout from '~routes/admin/authenticated/logout/page.connected.js'

// Community Settings
import CommunityContainer from '~routes/admin/authenticated/sidebar/community-settings/container'
import { withBackground, withUser, withSidebar } from '~root/routes-v1/hocs'

const About = () => (
  <div>
    <h2>About</h2>
  </div>
)

const AuthExample = () => (
  <Router>
    <Switch>
      <Route exact path='/login' component={withBackground(AccountLogin)} />
      <Route exact path='/register' component={withBackground(AccountRegister)} />
      <PrivateRoute exact path='/logout' component={Logout} />
      <PrivateRoute exact path='/' component={withUser(MobilizationsList)} />
      <PrivateRoute exact path='/community' component={withUser(CommunityList)} />
      <PrivateRoute exect path='/community/new' component={withUser(CommunityRegister)} />
      {/* Sidebar container */}
      <PrivateRoute
        path='/community'
        component={withUser(withSidebar(CommunityContainer))}
      />
      <PrivateRoute
        exact
        path='/mobilizations'
        component={withUser(withSidebar(MobilizationsList))}
      />
      <PrivateRoute
        exact
        path='/mobilizations/:mobilization_id/edit'
        component={withUser(withSidebar(MobilizationsEdit))}
      />
      <PrivateRoute exact path='/hello' component={About} />
      <Route component={TechnicalIssues} />
    </Switch>
  </Router>
)

export default AuthExample
