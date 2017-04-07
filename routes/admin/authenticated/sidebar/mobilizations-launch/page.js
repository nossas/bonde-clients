import React from 'react'
import { browserHistory } from 'react-router'

import * as paths from '~client/paths'
import * as MobActions from '~client/mobrender/redux/action-creators'
import MobSelectors from '~client/mobrender/redux/selectors'
import { PageCentralizedLayout, PageCentralizedLayoutTitle } from '~client/components/layout'
import { Tabs, Tab } from '~client/components/navigation/tabs'
import { FlatForm } from '~client/ux/components'
import { StepsContainerStack, StepContent } from '~client/components/steps'
import { FormDomain, FormShare } from '~client/mobilizations/components'

if (require('exenv').canUseDOM) {
  require('./form-share.scss')
}

const FormDomainImplementation = FormDomain({
  customValidate: values => {
    const errors = {}
    if (!values.custom_domain) {
      errors.custom_domain = 'Obrigatório'
    }
    return errors
  },
  mapStateToProps: state => {
    const mobilization = MobSelectors(state).getMobilization()
    return { initialValues: mobilization, mobilization }
  },
  mapActionCreatorsToProps: { submit: MobActions.asyncUpdateMobilization }
})

const FormShareImplementation = FormShare(
  state => ({ initialValues: MobSelectors(state).getMobilization() }),
  { submit: values => {
    console.log('[routes/admin/authenticated/sidebar/mobilizations-launch/page.js] values', values)
    return MobActions.asyncUpdateMobilization({
      ...values,
      next: () => browserHistory.push(
        paths.mobilizationLaunchEnd(values.id)
      )
    })
  }},
  values => {
    const errors = {}
    if (!values.facebook_share_image) {
      errors.facebook_share_image = 'Obrigatório'
    }
    if (!values.facebook_share_title) {
      errors.facebook_share_title = 'Obrigatório'
    }
    if (!values.facebook_share_description) {
      errors.facebook_share_description = 'Obrigatório'
    }
    if (!values.twitter_share_text) {
      errors.twitter_share_text = 'Obrigatório'
    }
    return errors
  }
)

const MobilizationsLaunchPage = ({ mobilization, ...formProps }) => {
  const stepDomainValidation = () => mobilization.custom_domain
  const stepShareValidation = () => (
    !!mobilization.facebook_share_image &&
    !!mobilization.facebook_share_title &&
    !!mobilization.facebook_share_description &&
    !!mobilization.twitter_share_text
  )

  return (
    <PageCentralizedLayout>
      <PageCentralizedLayoutTitle>
        Lançando sua mobilização
      </PageCentralizedLayoutTitle>

      <StepsContainerStack
        ComponentPointerContainer={Tabs}
        ComponentPointerChildren={Tab}
        pointerChildrenProps={({ index, step }) => ({ isActive: index === step, index })}
        progressValidations={[stepDomainValidation, stepShareValidation]}
      >
        <StepContent>
          <FormDomainImplementation
            {...formProps}
            FormComponent={FlatForm}
            titleText='Configure seu domínio'
            buttonText='Continuar'
          />
        </StepContent>

        <StepContent>
          <FormShareImplementation
            {...formProps}
            FormComponent={FlatForm}
            formClassNames='mobilization-launch--form-share'
            titleText='Configure as informações de compartilhamento'
            buttonText='Continuar'
          />
        </StepContent>
      </StepsContainerStack>
    </PageCentralizedLayout>
  )
}

export default MobilizationsLaunchPage
