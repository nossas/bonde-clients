import React, { Component, PropTypes } from 'react'

import { MobilizationBasicsForm } from '../components/settings'
import { SettingsPageContentLayout } from '../../../components/Layout'

const MobilizationBasicsEditFormPage = props => (
  <SettingsPageContentLayout>
    <MobilizationBasicsForm
      {...props}
      className="transparent"
      floatButton="Salvar"
    />
  </SettingsPageContentLayout>
)

export default MobilizationBasicsEditFormPage
