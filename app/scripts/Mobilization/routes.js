import React, { Component } from 'react'
import { Route, IndexRoute } from 'react-router'

import { MobilizationListPage, MobilizationNewPage, WrapperMobilizationApp } from './pages'
import { MobilizationBasicFormContainer } from './containers'

export default (
  <Route component={WrapperMobilizationApp}>
    <Route path="/" component={MobilizationListPage} />
    <Route path="/mobilizations/new" component={MobilizationNewPage} />
  </Route>
)
