import React from 'react'
import { Route } from 'react-router'

import { SettingsContainer } from './containers'

import {
  AutoFireForm,
  DonationWidgetSettings,
  Choices,
  Goals,
  ExportWidgetData
} from './../pages'

import FormWidgetRoutes from './plugins/Form/routes'
import PressureRoutes from './plugins/PressureWidget/routes'

const path = '/widgets'
const param = '/:widget_id'
const defaultPath = `${path}${param}`

const WidgetRoutes = parent => {
  return (
    <Route component={SettingsContainer}>
      {FormWidgetRoutes(`${parent}${defaultPath}`)}
      {PressureRoutes(`${parent}${defaultPath}`)}

      <Route path={`${parent}${defaultPath}/autofire`} component={AutoFireForm} />
      <Route path={`${parent}${defaultPath}/export`} component={ExportWidgetData} />
      <Route path={`${parent}${defaultPath}/donation`} component={DonationWidgetSettings} />
      <Route path={`${parent}${defaultPath}/match/choices`} component={Choices} />
      <Route path={`${parent}${defaultPath}/match/goals`} component={Goals} />
    </Route>
  )
}

export default WidgetRoutes
