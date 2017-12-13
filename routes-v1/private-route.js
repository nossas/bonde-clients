import React from 'react'
import { Route, Redirect as RedirectComponent } from 'react-router-dom'
import { connect } from 'react-redux'

import AccountSelectors from '~client/account/redux/selectors'
import * as CommunitySelectors from '~client/community/selectors'

const Redirect = ({ pathname, location }) => (
  <RedirectComponent to={{ pathname, state: { from: location } }} />
)

const PrivateRoute = ({
  component: Component,
  exact = false,
  path,
  authenticated,
  hasCommunity,
  ...rest
}) => (
  <Route
    {...rest}
    exact={exact}
    path={path}
    render={props => {
      const { location: { pathname } } = rest

      const isRoot = pathname === '/'
      const isCommunity = pathname.match(/\/community\/?/)
      const isMobilizations = pathname.match(/\/mobilizations\/?/)

      const mobilizationsPathname = (isRoot || isCommunity) && !isMobilizations
      const communityPathname = !isCommunity

      if (authenticated && hasCommunity && mobilizationsPathname) {
        return <Redirect {...props} pathname='/mobilizations' />
      }
      else if (authenticated && !hasCommunity && communityPathname) {
        return <Redirect {...props} pathname='/community' />
      }
      else if (!authenticated) {
        return <Redirect {...props} pathname='/login' />
      }
      else {
        return <Component {...props} />
      }
    }}
  />
)

const mapStateToProps = state => ({
  authenticated: AccountSelectors(state).getCredentials(),
  hasCommunity: !!CommunitySelectors.getCurrent(state)
})

export default connect(mapStateToProps)(PrivateRoute)
