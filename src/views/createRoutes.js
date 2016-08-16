import React from 'react'
import { Route } from 'react-router'

import {
  Application,
  UserDashboard,
  NotFound
} from '../../app/scripts/containers'

import {
  Login,
  Logout,
  RequireLogin,
  CustomDomainWrapper
} from '../../app/scripts/pages'

// Modules routes
import MobilizationRoute from '../../app/scripts/Mobilization/routes'
import { MatchShareContainerRoute } from '../../app/scripts/Widget/plugins/Match/routes'

export default function(store, host) {
  const isAppSubdomain = (host === `app.${process.env.APP_DOMAIN}`)

  if (isAppSubdomain) {
    return (
      <Route component={Application}>
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <Route component={RequireLogin} onEnter={RequireLogin.onEnter(store)}>
          {MobilizationRoute}
        </Route>
        <Route path="*" component={NotFound} status={404} />
      </Route>
    )
  }

  return (
    <Route component={Application}>
      <Route path="/" component={CustomDomainWrapper} />
      {MatchShareContainerRoute('/widgets/:widget_id')}
      <Route path="*" component={NotFound} status={404} />
    </Route>
  )
}
