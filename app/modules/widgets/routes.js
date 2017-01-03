import React from 'react'
import { Route } from 'react-router'

import { SettingsContainer } from '../../modules/widgets/containers'
import { AutofireFormPage } from '../../modules/widgets/pages'


export default () => (
  <Route path="/widgets/:widget_id" component={SettingsContainer}>
    <Route path="/autofire" component={AutofireFormPage} />
  </Route>
)
