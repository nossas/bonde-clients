import React from 'react'
import { Route } from 'react-router'

import { SettingsContainer } from './containers'

import {
  DonationWidgetSettings,
  ExportWidgetData
} from '../pages'

import {
  AutoFireForm
} from './settings'

import FormWidgetRoutes from './plugins/Form/routes'
import MatchWidgetRoutes from './plugins/Match/routes'
import PressureRoutes from './plugins/PressureWidget/routes'

const path = '/widgets'
const param = '/:widget_id'
const defaultPath = `${path}${param}`

const WidgetRoutes = parent => {
  return (
    <Route component={SettingsContainer}>
      {FormWidgetRoutes(`${parent}${defaultPath}`)}
      {MatchWidgetRoutes(`${parent}${defaultPath}`)}
      {PressureRoutes(`${parent}${defaultPath}`)}

      <Route path={`${parent}${defaultPath}/autofire`} component={AutoFireForm} />
      <Route path={`${parent}${defaultPath}/export`} component={ExportWidgetData} />
      <Route path={`${parent}${defaultPath}/donation`} component={DonationWidgetSettings} />
    </Route>
  )
}

export default WidgetRoutes
