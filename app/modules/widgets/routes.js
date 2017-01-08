import React from 'react'
import { Route } from 'react-router'

import { SettingsContainer } from './containers'
import { AutofireFormPage, DataExportPage } from './pages'

const namespace = '/widgets/:widget_id'

export default () => (
  <Route path={namespace} component={SettingsContainer}>
    <Route path='/autofire' component={AutofireFormPage} />
    <Route path='/export' component={DataExportPage} />
  </Route>
)
