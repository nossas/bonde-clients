import React from 'react'
import { Route } from 'react-router'

// Current module dependencies
import { SettingsEmailPage, SettingsFormPage, SettingsFinishMessagePage } from './pages'

const namespace = '/pressure'

export default () => [
  <Route path={`${namespace}`} component={SettingsFormPage} />,                 // <~ Migrated!
  <Route path={`${namespace}/email`} component={SettingsEmailPage} />,          // <~ Migrated!
  <Route path={`${namespace}/finish`} component={SettingsFinishMessagePage} />  // <~ Migrated!
]
