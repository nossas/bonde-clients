import React from 'react'

import {
  SettingsPageLayout,
  SettingsPageContentLayout
} from '~client/components/layout'
import { SettingsForm } from '~client/ux/components'
import { FormDomain, SettingsMenu } from '~client/mobilizations/components'

const MobilizationsSettingsDomainPage = ({ mobilization, location, fields, ...formProps }) => {
  if (!mobilization.custom_domain) {
    formProps.buttonText = 'Lançar mobilização'
  } else {
    formProps.successMessage = `${mobilization.name} lançada com sucesso.`
  }

  return (
    <SettingsPageLayout>
      <SettingsMenu mobilization={mobilization} location={location} />
      <SettingsPageContentLayout>
        <FormDomain
          FormComponent={SettingsForm}
          formProps={formProps}
          fields={fields}
          mobilization={mobilization}
        />
      </SettingsPageContentLayout>
    </SettingsPageLayout>
  )
}

export default MobilizationsSettingsDomainPage
