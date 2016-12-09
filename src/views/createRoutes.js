import React from 'react'
import { Route } from 'react-router'

import {
  Application,
  NotFound
} from '../../app/scripts/containers'

import { CustomDomainWrapper } from '../../app/scripts/pages'

import * as Paths from '../../app/scripts/Paths'

import { fetchMobilizations, mobilizationsIsLoaded } from '../../app/scripts/Mobilization/MobilizationActions'
// TODO: Refactor actions to module
import { fetchOrganizations, isOrganizationsLoaded } from '../../app/scripts/reducers/organizations'

import { createExternalRoutes as matchCreateExternalRoutes } from '../../app/scripts/Widget/plugins/Match'

import { DashboardSidebar } from '../../app/scripts/Dashboard/components'

import { createRoutes as mobilizationCreateRoutes } from '../../app/scripts/Mobilization'
import {
  createContainer as accountCreateContainer,
  createRoutes as accountCreateRoutes,
  requireLoginWrapper
} from '../../app/scripts/Account'
import {
  createRoutes as communityCreateRoutes,
  fetch as fetchCommunity
} from '../../app/scripts/Community'



const fetchData = ({ dispatch, getState }) => {
  const promises = []

  // TODO: When filter mobilization by user owner, make code here
  if (!mobilizationsIsLoaded(getState())) {
    promises.push(dispatch(fetchMobilizations()))
  }

  if (!isOrganizationsLoaded(getState())) {
    promises.push(dispatch(fetchOrganizations()))
  }

  return Promise.all(promises)
}

const componentDidMount = (props) => {
  // TODO this callback is a workaround to load mobilizations in client-side
  // but it should be replaced by the static fetchData method that is fetching
  // mobilizations only in the server-side for now
  const { organizations, mobilization, dispatch } = props

  if (!organizations.loaded) {
    dispatch(fetchOrganizations())
  }

  if (!mobilization.loaded) {
    dispatch(fetchMobilizations())
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    organizations: state.organizations,
    mobilization: state.mobilization,
    community: state.community
  }
}

const AccountContainer = accountCreateContainer({
  sidebarComponentRender: <DashboardSidebar />,
  loginRedirectUrl: Paths.login(),
  fetchData,
  componentDidMount,
  mapStateToProps,
})


export default function(store, host) {
  const isAppSubdomain = (host === `app.${process.env.APP_DOMAIN}`)

  if (isAppSubdomain) {

    const requiredLogin = requireLoginWrapper(store, Paths.login())

    return (
      <Route component={Application}>
        {accountCreateRoutes(AccountContainer, requiredLogin, '/community')}
        {mobilizationCreateRoutes(store, AccountContainer)}
        {communityCreateRoutes(requiredLogin)}
        <Route path="*" component={NotFound} status={404} />
      </Route>
    )
  }

  return (
    <Route component={Application}>
      <Route path="/" component={CustomDomainWrapper} />
      {matchCreateExternalRoutes({ prefix: '/widgets/:widget_id' })}
      <Route path="*" component={NotFound} status={404} />
    </Route>
  )
}
