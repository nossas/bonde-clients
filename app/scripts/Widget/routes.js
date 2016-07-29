import React from 'react'

import { r } from './../../util/short-aliases'
import {
  AutoFireForm,
  DonationWidgetSettings,
  Choices,
  Goals,
  ExportWidgetData
} from './../pages'

import { pages as FormWidgetPages } from './modules/Form'
import FormWidgetRoutes from './modules/Form/routes'

const path = '/widgets'
const param = '/:widget_id'
const current = `${path}${param}`

const WidgetRoutes = parent => [
  ...FormWidgetRoutes(`${parent}${current}`),
  r(`${parent}${current}/autofire`, AutoFireForm),
  r(`${parent}${current}/export`, ExportWidgetData),
  r(`${parent}${current}/donation`, DonationWidgetSettings),
  r(`${parent}${current}/match/choices`, Choices),
  r(`${parent}${current}/match/goals`, Goals)
]

export default WidgetRoutes
