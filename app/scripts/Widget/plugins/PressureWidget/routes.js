import React from 'react'
import { Route } from 'react-router'

import * as settings from './settings'


const PressureRoutes = parentPath => [
  <Route path={`${parentPath}/pressure/form`} component={settings.FormPage} />,
]

export default PressureRoutes
