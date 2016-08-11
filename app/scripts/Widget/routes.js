import React from 'react'
import { Route } from 'react-router'

import {
  AutoFireForm,
  DonationWidgetSettings,
  ExportWidgetData
} from './../pages'

import FormWidgetRoutes from './plugins/Form/routes'
import MatchWidgetRoutes from './plugins/Match/routes'

const path = '/widgets'
const param = '/:widget_id'
const defaultPath = `${path}${param}`

const WidgetRoutes = parent => [
  ...FormWidgetRoutes(`${parent}${defaultPath}`),
  ...MatchWidgetRoutes(`${parent}${defaultPath}`),
  <Route path={`${parent}${defaultPath}/autofire`} component={AutoFireForm} />,
  <Route path={`${parent}${defaultPath}/export`} component={ExportWidgetData} />,
  <Route path={`${parent}${defaultPath}/donation`} component={DonationWidgetSettings} />
]

export default WidgetRoutes
