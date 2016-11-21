import React, { Component, PropTypes } from 'react'

import { MobilizationCityForm } from '../components/settings'
import { SettingsPageContentLayout } from '../../../components/Layout'

const MobilizationCityEditPage = props => (
  <SettingsPageContentLayout>
    <MobilizationCityForm
      {...props}
      className="transparent"
      floatButton="Salvar"
      successMessage="Formulário atualizado com sucesso!"
    />
  </SettingsPageContentLayout>
)

export default MobilizationCityEditPage
