
import { FormattedMessage } from 'react-intl'
import { FormDomain } from './../../../../../mobilizations/components'
import * as paths from './../../../../../paths'
import { SettingsForm } from './../../../../../ux/components'


const MobilizationsSettingsDomainPage = ({ location, history, mobilization, ...formProps }) => {
  return (
    <FormDomain
      {...formProps}
      mobilization={mobilization}
      formComponent={SettingsForm}
      redirectToCreateDNS={() => history.push(paths.communityDomainCreate())}
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
