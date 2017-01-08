import React from 'react'
import { Route } from 'react-router'

import {
  NewMobilizationContainer
} from './containers'
import {
  /*MobilizationSharingPage,*/
  MobilizationCustomDomainPage,
  EditMobilizationPage,
} from './pages'

import mobilizationTemplatesRoutes from './plugins/Templates/MobilizationTemplatesRoutes'
import blocksCreateRoutes from '../../modules/mobilizations/blocks/routes'
import { createRoutes as widgetCreateRoutes } from './../Widget'

import {
  MobilizationEditContainer,
  MobilizationDashboardContainer,
  MobilizationSettingsContainer
} from '../../modules/mobilizations/containers'

import {
  MobilizationPage,
  MobilizationAddPage,
  MobilizationListPage
} from '../../modules/mobilizations/pages'

import {
  MobilizationBasicsPage,
  MobilizationAnalyticsPage,
  MobilizationSharingPage,
  MobilizationDomainPage
} from '../../modules/mobilizations/pages/settings'


export default requiredLogin => (
  <Route component={MobilizationDashboardContainer} onEnter={requiredLogin}>
    <Route path="/" component={MobilizationListPage} />
    <Route path="/mobilizations/new" component={MobilizationAddPage} />
    {mobilizationTemplatesRoutes("/mobilizations/:mobilization_id")}
    <Route path="/mobilizations/:mobilization_id" component={MobilizationEditContainer}>
      <Route path="/edit" component={MobilizationPage} />
      <Route component={MobilizationSettingsContainer}>
        <Route path="/basics" component={MobilizationBasicsPage} />
        <Route path="/analytics" component={MobilizationAnalyticsPage} />
        <Route path="/sharing" component={MobilizationSharingPage} />
        <Route path="/customDomain" component={MobilizationDomainPage} />
      </Route>
      {blocksCreateRoutes()}
      {widgetCreateRoutes()}
    </Route>
  </Route>
)
