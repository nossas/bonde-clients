import React from 'react'
import { Route } from 'react-router'

import Container from '../Dashboard/Container'

import {
  NewMobilizationContainer,
  MobilizationDashboardContainer,
  MobilizationSettingsContainer
} from './containers'
import {
  MobilizationListPage,
  MobilizationBasicsNewFormPage,
  MobilizationCityNewPage,
  MobilizationBasicsEditFormPage,
  MobilizationCityEditPage,
  MobilizationAnalyticsPage,
  MobilizationSharingPage,
  MobilizationCustomDomainPage,
  EditMobilizationPage,
} from './pages'
import { NewBlockPage } from '../Block/pages'


import mobilizationTemplatesRoutes from './plugins/Templates/MobilizationTemplatesRoutes'
import { createRoutes as widgetCreateRoutes } from './../Widget'


export default (store, AccountContainer) => (
  <Route component={AccountContainer} onEnter={AccountContainer.onEnter(store)}>
    <Route path="/" component={MobilizationListPage} />
    <Route path="/mobilizations" component={NewMobilizationContainer}>
      <Route path="/new" component={MobilizationBasicsNewFormPage} />
      <Route path="/:mobilization_id/cityNew" component={MobilizationCityNewPage} />
    </Route>
    {mobilizationTemplatesRoutes("/mobilizations/:mobilization_id")}
    <Route path="/mobilizations/:mobilization_id" component={MobilizationDashboardContainer}>
      <Route path="/edit" component={EditMobilizationPage} />
      <Route path="/blocks/new" component={NewBlockPage} />
      {widgetCreateRoutes()}
      <Route component={MobilizationSettingsContainer}>
        <Route path="/basics" component={MobilizationBasicsEditFormPage} />
        <Route path="/city" component={MobilizationCityEditPage} />
        <Route path="/analytics" component={MobilizationAnalyticsPage} />
        <Route path="/sharing" component={MobilizationSharingPage} />
        <Route path="/customDomain" component={MobilizationCustomDomainPage} />
      </Route>
    </Route>
  </Route>
)
