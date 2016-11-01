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
  MobilizationBasicsNewFormPage,
  MobilizationBasicsEditFormPage,
  MobilizationCityNewPage,
  MobilizationCityEditPage,
  MobilizationAnalyticsPage,
  MobilizationSharingPage,
  MobilizationCustomDomainPage,
  MobilizationFontsPage,
  EditMobilizationPage
} from './pages'

import mobilizationTemplatesRoutes from './plugins/Templates/MobilizationTemplatesRoutes'
import widgetRoutes from './../Widget/routes'

const path = '/mobilizations'
const param = '/:mobilization_id'
const defaultPath = `${path}${param}`

export default (
  <Route component={UserDashboardContainer}>
    <Route path="/" component={MobilizationListPage} />
    {/* TODO: Refactor pages */}
    <Route component={NewMobilizationContainer}>
      <Route path={`/${path}/new`} component={MobilizationBasicsNewFormPage} />
      <Route path={`/${defaultPath}/cityNew`} component={MobilizationCityNewPage} />
    </Route>

    {mobilizationTemplatesRoutes(defaultPath)}

    <Route component={MobilizationDashboardContainer}>
      <Route path={`/${defaultPath}/edit`} component={EditMobilizationPage} />
      <Route path={`/${defaultPath}/blocks/new`} component={NewBlockPage} />
      {widgetRoutes(defaultPath)}
      <Route component={MobilizationSettingsContainer} >
        <Route path={`/${defaultPath}/basics`} component={MobilizationBasicsEditFormPage} />
        <Route path={`/${defaultPath}/city`} component={MobilizationCityEditPage} />
        <Route path={`/${defaultPath}/analytics`} component={MobilizationAnalyticsPage} />
        <Route path={`/${defaultPath}/sharing`} component={MobilizationSharingPage} />
        <Route path={`/${defaultPath}/customDomain`} component={MobilizationCustomDomainPage} />
      </Route>
    </Route>
  </Route>
)
