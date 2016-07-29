import React, { Component } from 'react'
import { Route, IndexRoute } from 'react-router'

import { MobilizationDashboard } from './../containers'
import { MobilizationListPage, WrapperMobilizationApp } from './pages'
import WidgetRoutes from './../Widget/routes'

const path = '/mobilizations'
const param = '/:mobilization_id'
const current = `${path}${param}`

export default (
  <Route component={WrapperMobilizationApp}>
    <Route path="/" component={MobilizationListPage} />
    {
      // <Route path="/mobilizations/new" component={NewMobilization} />
      // <Route path="/mobilizations/:mobilization_id/cityNew" component={MobilizationCity} />
    }

    <Route component={MobilizationDashboard}>
      {
        // <Route path="/mobilizations/:mobilization_id/edit" component={EditMobilization} />
        // <Route path="/mobilizations/:mobilization_id/blocks/new" component={NewBlock} />
      }
      {WidgetRoutes(current)}
      {
        // <Route path="/mobilizations/:mobilization_id/fonts" component={MobilizationFonts} />
        // <Route component={MobilizationSettings} >
        //   <Route path="/mobilizations/:mobilization_id/basics" component={MobilizationBasics} />
        //   <Route path="/mobilizations/:mobilization_id/city" component={MobilizationCity} />
        //   <Route path="/mobilizations/:mobilization_id/analytics" component={MobilizationAnalytics} />
        //   <Route path="/mobilizations/:mobilization_id/sharing" component={MobilizationSharing} />
        //   <Route path="/mobilizations/:mobilization_id/customDomain" component={MobilizationCustomDomain} />
        // </Route>
      }
    </Route>
  </Route>
)
