import React, { Component } from 'react'
import { Route, IndexRoute } from 'react-router'

import { MobilizationListPage, WrapperMobilizationApp } from './pages'

export default (
  <Route component={WrapperMobilizationApp}>
    <Route path="/" component={MobilizationListPage} />
  </Route>
)
