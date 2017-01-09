import React from 'react'
import { Route } from 'react-router'

import { SettingsDonationPage } from '../../../../modules/widgets/__plugins__/donation/pages'

export default () => (
  <Route path='/donation' key='settings-donation-page' component={SettingsDonationPage} />
)
