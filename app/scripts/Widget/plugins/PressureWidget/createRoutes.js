import React from 'react'
import { Route } from 'react-router'

import { FormPage } from './settings'
import { SettingsEmailPage } from '../../../../modules/widgets/__plugins__/pressure/pages'

export default () => [
  <Route path='/pressure/form' component={FormPage} />,
  <Route path='/pressure/email' component={SettingsEmailPage} />
]
