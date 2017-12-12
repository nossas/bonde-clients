import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import * as CommunitySelectors from '~client/community/selectors'

const AuthRedirectStrategy = ({ isLogged, currentCommunity }) => {
  return (
    <Route render={({ staticContext }) => {
      if (!isLogged) {
        return <Redirect from='/' to='/login' />
      }
      else if (isLogged && !currentCommunity) {
        return <Redirect from='/' to='/community' />
      }
      else if (isLogged && currentCommunity) {
        return <Redirect from='/' to='/mobilizations' />
      }
    }} />
  )
}

const mapStateToProps = state => ({
  isLogged: state.auth.credentials,
  currentCommunity: CommunitySelectors.getCurrent(state)
})

export default connect(mapStateToProps)(AuthRedirectStrategy)
