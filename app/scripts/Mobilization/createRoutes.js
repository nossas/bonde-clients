import React from 'react'
import { Route } from 'react-router'

import mobilizationTemplatesRoutes from './plugins/Templates/MobilizationTemplatesRoutes'
import { createRoutes as widgetCreateRoutes } from './../Widget'

import blocksCreateRoutes from '../../modules/mobilizations/blocks/routes'

import {
  MobilizationAddContainer,
  MobilizationEditContainer,
  MobilizationDashboardContainer,
  MobilizationSettingsContainer
} from '../../modules/mobilizations/containers'

import {
  FetchTemplatesContainer
} from '../../modules/mobilizations/templates/containers'

import {
  TemplateChoosePage
} from '../../modules/mobilizations/templates/pages'

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
    <Route path="/mobilizations" component={MobilizationAddContainer}>
      <Route path="/new" component={MobilizationAddPage} />
      <Route path="/:mobilization_id" component={FetchTemplatesContainer}>
        <Route path="/templates/choose" component={TemplateChoosePage} />
      </Route>
      {mobilizationTemplatesRoutes("/mobilizations/:mobilization_id")}
    </Route>
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
