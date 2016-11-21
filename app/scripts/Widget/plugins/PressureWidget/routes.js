import React from 'react'
import { Route } from 'react-router'

import * as settings from './settings'


const PressureRoutes = parentPath => [
  <Route key="p-form" path={`${parentPath}/pressure/form`} component={settings.FormPage} />,
  <Route key="p-email" path={`${parentPath}/pressure/email`} component={settings.EmailPage} />,
]

export default PressureRoutes
