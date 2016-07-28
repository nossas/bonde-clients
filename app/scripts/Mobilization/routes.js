import React, { Component } from 'react'
import { Route, IndexRoute } from 'react-router'

import { MobilizationListPage } from './pages'
import { WrapperMobilizationApp } from './containers'

export default (
  <Route component={WrapperMobilizationApp}>
    <Route path="/tests" component={MobilizationListPage} />
  </Route>
)
