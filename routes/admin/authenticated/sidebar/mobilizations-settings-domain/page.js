import React from 'react'

import { SettingsPageLayout, SettingsPageContentLayout } from '~client/components/layout'
import MobSelectors from '~client/mobrender/redux/selectors'
import * as MobActions from '~client/mobrender/redux/action-creators'
import { SettingsForm } from '~client/ux/components'
import { FormDomain, SettingsMenu } from '~client/mobilizations/components'

const FormDomainImplementation = FormDomain({
  mapStateToProps: state => {
    const mobilization = MobSelectors(state).getMobilization()
    return { initialValues: mobilization, mobilization }
  },
  mapActionCreatorsToProps: { submit: MobActions.asyncUpdateMobilization }
})

const MobilizationsSettingsDomainPage = ({ location, mobilization, ...formProps }) => {
  return (
    <SettingsPageLayout>
      <SettingsMenu mobilization={mobilization} location={location} />
      <SettingsPageContentLayout>
        <FormDomainImplementation
          {...formProps}
          FormComponent={SettingsForm}
          successMessage='Dados de domínio salvos com sucesso'
        />
      </SettingsPageContentLayout>
    </SettingsPageLayout>
  )
}

export default MobilizationsSettingsDomainPage
