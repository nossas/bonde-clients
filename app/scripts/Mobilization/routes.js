import React, { Component } from 'react'
import { Route, IndexRoute } from 'react-router'

import { MobilizationListPage, WrapperMobilizationApp } from './pages'
import {
  NewMobilization,
  EditMobilization,
  NewBlock,
  MobilizationFonts,
  MobilizationBasics,
  MobilizationCity,
  MobilizationAnalytics,
  MobilizationSharing,
  MobilizationCustomDomain
} from './../pages'

import {
  UserDashboardContainer,
  NewMobilizationContainer,
  MobilizationDashboardContainer,
  MobilizationSettingsContainer
} from './containers'

import {
  MobilizationBasicsFormPage,
  MobilizationCityPage
} from './pages'

import widget from './../Widget/routes'

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
      <Route path="/mobilizations/:mobilization_id/edit" component={EditMobilization} />
      <Route path="/mobilizations/:mobilization_id/blocks/new" component={NewBlock} />
      { widget(defaultPath) }
      <Route path="/mobilizations/:mobilization_id/fonts" component={MobilizationFonts} />
      <Route component={MobilizationSettingsContainer} >
        <Route path="/mobilizations/:mobilization_id/basics" component={MobilizationBasicsFormPage} />
        <Route path="/mobilizations/:mobilization_id/city" component={MobilizationCity} />
        <Route path="/mobilizations/:mobilization_id/analytics" component={MobilizationAnalytics} />
        <Route path="/mobilizations/:mobilization_id/sharing" component={MobilizationSharing} />
        <Route path="/mobilizations/:mobilization_id/customDomain" component={MobilizationCustomDomain} />
      </Route>
    </Route>
  </Route>
)
