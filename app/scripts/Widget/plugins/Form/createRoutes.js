import React from 'react'
import { Route } from 'react-router'

import {
  SettingsFieldsPage,
  SettingsFormPage
} from '../../../../modules/widgets/__plugins__/form/pages'

export default () => [
  <Route path='/form' key='settings-form' component={SettingsFormPage} />,
  <Route path='/fields' key='settings-fields' component={SettingsFieldsPage} />
]
