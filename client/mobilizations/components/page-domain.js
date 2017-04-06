import React from 'react'

import MobSelectors from '~client/mobrender/redux/selectors'
import * as MobActions from '~client/mobrender/redux/action-creators'
import { Tabs, Tab } from '~client/components/navigation/tabs'
import { FlatForm } from '~client/ux/components'
import { StepsContainerStack, StepContent } from '~client/components/steps'
import { FormDomain, FormShare } from '~client/mobilizations/components'

const FormDomainImplementation = FormDomain({
  customValidate: values => {
    const errors = {}
    if (!values.custom_domain) {
      errors.custom_domain = 'Campo obrigatório'
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
  { submit: MobActions.asyncUpdateMobilization },
  values => {
    const errors = {}
    if (!values.id) {
      errors.id = 'Campo obrigatório'
    }
    if (!values.facebook_share_image) {
      errors.facebook_share_image = 'Campo obrigatório'
    }
    if (!values.facebook_share_title) {
      errors.facebook_share_title = 'Campo obrigatório'
    }
    if (!values.facebook_share_description) {
      errors.facebook_share_description = 'Campo obrigatório'
    }
    if (!values.twitter_share_text) {
      errors.twitter_share_text = 'Campo obrigatório'
    }
    return errors
  }
)

const PageDomain = ({ mobilization, ...formProps }) => {
  const stepDomainValidation = () => mobilization.custom_domain
  const stepShareValidation = () => false

  return (
    <StepsContainerStack
      ComponentPointerContainer={Tabs}
      ComponentPointerChildren={Tab}
      pointerChildrenProps={({ index, step }) => ({ isActive: index === step, index })}
      progressValidations={[
        stepDomainValidation,
        stepShareValidation
      ]}
    >
      <StepContent>
        <FormDomainImplementation
          {...formProps}
          FormComponent={FlatForm}
          titleText='Configure seu domínio'
        />
      </StepContent>

      <StepContent>
        <FormShareImplementation
          {...formProps}
          FormComponent={FlatForm}
          titleText='Configure as informações de compartilhamento'
          formClassNames='mobilization-launch--form-share'
        />
      </StepContent>
    </StepsContainerStack>
  )
}

export default PageDomain
