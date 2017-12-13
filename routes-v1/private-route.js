import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import AccountSelectors from '~client/account/redux/selectors'

const PrivateRoute = ({
  component: Component,
  exact = false,
  path,
  authenticated,
  ...rest
}) => (
  <Route
    {...rest}
    exact={exact}
    path={path}
    render={props => (
      authenticated ? <Component {...props} /> : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location }
          }}
        />
      )
    )}
  />
)

const mapStateToProps = state => ({
  authenticated: AccountSelectors(state).getCredentials()
})

export default connect(mapStateToProps)(PrivateRoute)
