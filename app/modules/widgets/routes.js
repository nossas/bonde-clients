import React from 'react'
import { Route } from 'react-router'

// Children modules dependencies
import matchRoutes from './__plugins__/match/routes'
import pressureRoutes from './__plugins__/pressure/routes'
import { createRoutes as formCreateRoutes } from '../../scripts/Widget/plugins/Form'
import { createRoutes as donationCreateRoutes } from '../../scripts/Widget/plugins/Donation'

// Current module dependencies
import { SettingsContainer } from './containers'
import { AutofireFormPage, DataExportPage } from './pages'

const namespace = '/widgets/:widget_id'

export default () => (
  <Route path={namespace} component={SettingsContainer}>
    <Route path='/autofire' component={AutofireFormPage} />
    <Route path='/export' component={DataExportPage} />

    {matchRoutes()}
    {pressureRoutes()}
    {formCreateRoutes()}
    {donationCreateRoutes()}
  </Route>
)
