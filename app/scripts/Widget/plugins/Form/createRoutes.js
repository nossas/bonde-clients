import React from 'react'
import { Route } from 'react-router'

import { Form } from './pages'
import { SettingsFieldsPage } from '../../../../modules/widgets/__plugins__/form/pages'

export default () => [
  <Route key='form-config' path='/form' component={Form} />,
  <Route key='form-fields' path='/fields' component={SettingsFieldsPage} />
]
