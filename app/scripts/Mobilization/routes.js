import React, { Component } from 'react'
import { Route, IndexRoute } from 'react-router'

import { NewBlockPage } from './../Block/pages'

import {
  UserDashboardContainer,
  NewMobilizationContainer,
  MobilizationDashboardContainer,
  MobilizationSettingsContainer
} from './containers'

import {
  WrapperMobilizationApp,
  MobilizationListPage,
  MobilizationBasicsFormPage,
  MobilizationCityPage,
  MobilizationAnalyticsPage,
  MobilizationSharingPage,
  MobilizationCustomDomainPage,
  MobilizationFontsPage,
  EditMobilizationPage
} from './pages'

import widgetRoutes from './../Widget/routes'

const path = '/mobilizations'
const param = '/:mobilization_id'
const defaultPath = `${path}${param}`

export default (
  <Route component={UserDashboardContainer}>
    <Route path="/" component={MobilizationListPage} />
    {/* TODO: Refactor pages */}
    <Route component={NewMobilizationContainer}>
      <Route path="/mobilizations/new" component={MobilizationBasicsFormPage} />
      <Route path="/mobilizations/:mobilization_id/cityNew" component={MobilizationCityPage} />
    </Route>

    <Route component={MobilizationDashboardContainer}>
      <Route path="/mobilizations/:mobilization_id/edit" component={EditMobilizationPage} />
      <Route path="/mobilizations/:mobilization_id/blocks/new" component={NewBlockPage} />
      { widgetRoutes(defaultPath) }
      <Route component={MobilizationSettingsContainer} >
        <Route path="/mobilizations/:mobilization_id/basics" component={MobilizationBasicsFormPage} />
        <Route path="/mobilizations/:mobilization_id/city" component={MobilizationCityPage} />
        <Route path="/mobilizations/:mobilization_id/analytics" component={MobilizationAnalyticsPage} />
        <Route path="/mobilizations/:mobilization_id/sharing" component={MobilizationSharingPage} />
        <Route path="/mobilizations/:mobilization_id/customDomain" component={MobilizationCustomDomainPage} />
      </Route>
    </Route>
  </Route>
)
