import React from 'react'
import { Route } from 'react-router'

import * as settings from './settings'

const FormRoutes = parentPath => [
  <Route path={`${parentPath}/donation`} component={settings.DonationPage} />
]

export default FormRoutes
