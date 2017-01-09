import React from 'react'
import { Route } from 'react-router'

import {
  SettingsEmailPage,
  SettingsFormPage
} from '../../../../modules/widgets/__plugins__/pressure/pages'

export default () => [
  <Route path='/pressure/form' component={SettingsFormPage} />,
  <Route path='/pressure/email' component={SettingsEmailPage} />
]
