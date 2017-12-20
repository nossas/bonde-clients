import React from 'react'
import { browserHistory } from 'react-router'
import { FormattedMessage } from 'react-intl'

import { SettingsPageLayout, SettingsPageContentLayout } from '~client/components/layout'
import { SettingsForm } from '~client/ux/components'
import { FormDomain, SettingsMenu } from '~client/mobilizations/components'
import * as paths from '~client/paths'

const MobilizationsSettingsDomainPage = ({ location, mobilization, ...formProps }) => {
  return (
    <FormDomain
      {...formProps}
      mobilization={mobilization}
      formComponent={SettingsForm}
      redirectToCreateDNS={() => browserHistory.push(paths.communityDomainCreate())}
      successMessage={
        <FormattedMessage
          id='page--mobilizations-domain.form-domain.success-message'
          defaultMessage='Dados de domínio salvos com sucesso'
        />
      }
    />
  )
}

export default MobilizationsSettingsDomainPage
