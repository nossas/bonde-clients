import React from 'react'
import { Route } from 'react-router'

import { SettingsFieldsPage, SettingsFormPage, SettingsFinishMessagePage } from './pages'

export default () => [
  <Route path='/form' key='settings-form' component={SettingsFormPage} />,                            // <~ Migrated!
  <Route path='/fields' key='settings-fields' component={SettingsFieldsPage} />,                      // <~ Migration In Progress
  <Route path='/finish' key='settings-finish-message-page' component={SettingsFinishMessagePage} />
]
