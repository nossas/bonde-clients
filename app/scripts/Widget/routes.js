import React from 'react'
import { Route } from 'react-router'

import {
  AutoFireForm,
  DonationWidgetSettings,
  Choices,
  Goals,
  ExportWidgetData
} from './../pages'

import FormWidgetRoutes from './plugins/Form/routes'

const path = '/widgets'
const param = '/:widget_id'
const defaultPath = `${path}${param}`

const WidgetRoutes = parent => [
  ...FormWidgetRoutes(`${parent}${defaultPath}`),
  <Route path={`${parent}${defaultPath}/autofire`} component={AutoFireForm} />,
  <Route path={`${parent}${defaultPath}/export`} component={ExportWidgetData} />,
  <Route path={`${parent}${defaultPath}/donation`} component={DonationWidgetSettings} />,
  <Route path={`${parent}${defaultPath}/match/choices`} component={Choices} />,
  <Route path={`${parent}${defaultPath}/match/goals`} component={Goals} />
]

export default WidgetRoutes
