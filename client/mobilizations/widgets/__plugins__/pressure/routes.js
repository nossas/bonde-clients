import React from 'react'
import { Route } from 'react-router'

// Current module dependencies
import { SettingsEmailPage, SettingsFormPage, SettingsFinishMessagePage } from './pages'

const namespace = '/pressure'

export default () => [
  <Route path={`${namespace}`} component={SettingsFormPage} />,                 // <~ Migration In Progress
  <Route path={`${namespace}/email`} component={SettingsEmailPage} />,
  <Route path={`${namespace}/finish`} component={SettingsFinishMessagePage} />
]
