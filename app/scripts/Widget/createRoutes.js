import React from 'react'
import { Route } from 'react-router'

import { SettingsContainer } from '../../modules/widgets/containers'

import matchRoutes from '../../modules/widgets/__plugins__/match/routes'
import { createRoutes as pressureCreateRoutes } from './plugins/PressureWidget'
import { createRoutes as formCreateRoutes } from './plugins/Form'
import { createRoutes as donationCreateRoutes } from './plugins/Donation'

export default () => (
  <Route path='/widgets/:widget_id' component={SettingsContainer}>
    {pressureCreateRoutes()}
    {formCreateRoutes()}
    {matchRoutes()}
    {donationCreateRoutes()}
  </Route>
)
