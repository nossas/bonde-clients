import React from 'react'
import { Route } from 'react-router'
import { Application, UserDashboard, MobilizationDashboard } from '../../app/scripts/containers'
import { TopMenu, MobilizationMenu } from '../../app/scripts/components'

import {
  Login,
  Logout,
  ListMobilizations,
  NewMobilization,
  ShowMobilization,
  EditMobilization,
  MobilizationBasics,
  MobilizationCity,
  MobilizationAnalytics,
  NewBlock,
  FormWidgetFields,
  FormWidgetForm,
  MobilizationFonts,
  MobilizationSharing,
  RequireLogin
} from '../../app/scripts/pages'

export default function(store) {
  return (
    <Route component={Application}>
      <Route path="/login" component={Login} />
      <Route path="/logout" component={Logout} />
      <Route component={RequireLogin} onEnter={RequireLogin.onEnter(store)}>
        <Route component={UserDashboard}>
          <Route path="/" components={{main: ListMobilizations}} />
          <Route path="/mobilizations/new" components={{main: NewMobilization}} />
          <Route component={MobilizationDashboard} >
            <Route path="/mobilizations/:mobilization_id/edit" components={{main: EditMobilization, sidebar: MobilizationMenu, topMenu: TopMenu}} />
            <Route path="/mobilizations/:mobilization_id/basics" components={{main: MobilizationBasics, sidebar: MobilizationMenu, topMenu: TopMenu}} />
            <Route path="/mobilizations/:mobilization_id/city" components={{main: MobilizationCity, sidebar: MobilizationMenu, topMenu: TopMenu}} />
            <Route path="/mobilizations/:mobilization_id/cityNew" components={{main: MobilizationCity, topMenu: TopMenu}} />
            <Route path="/mobilizations/:mobilization_id/analytics" components={{main: MobilizationAnalytics, sidebar: MobilizationMenu, topMenu: TopMenu}} />
            <Route path="/mobilizations/:mobilization_id/fonts" components={{main: MobilizationFonts, sidebar: MobilizationMenu, topMenu: TopMenu}} />
            <Route path="/mobilizations/:mobilization_id/sharing" components={{main: MobilizationSharing, sidebar: MobilizationMenu, topMenu: TopMenu}} />
            <Route path="/mobilizations/:mobilization_id/blocks/new" components={{main: NewBlock, sidebar: MobilizationMenu, topMenu: TopMenu}} />
            <Route path="/mobilizations/:mobilization_id/widgets/:widget_id/fields" components={{main: FormWidgetFields, sidebar: MobilizationMenu, topMenu: TopMenu}} />
            <Route path="/mobilizations/:mobilization_id/widgets/:widget_id/form" components={{main: FormWidgetForm, sidebar: MobilizationMenu, topMenu: TopMenu}} />
          </Route>
        </Route>
      </Route>
      <Route component={UserDashboard}>
        <Route component={MobilizationDashboard} >
          <Route path="/mobilizations/:mobilization_id" components={{main: ShowMobilization}} />
        </Route>
      </Route>
    </Route>
  )
}
