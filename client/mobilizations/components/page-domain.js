import React from 'react'

import MobSelectors from '~client/mobrender/redux/selectors'
import * as MobActions from '~client/mobrender/redux/action-creators'
import { Tabs, Tab } from '~client/components/navigation/tabs'
import { FlatForm } from '~client/ux/components'
import { StepsContainerStack, StepContent, StepButton } from '~client/components/steps'
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

const PageDomain = ({ mobilization, ...formProps }) => {
  return (
    <StepsContainerStack
      ComponentPointerContainer={Tabs}
      ComponentPointerChildren={Tab}
      pointerChildrenProps={({ index, step }) => ({ isActive: index === step, index })}
    >
      <StepContent
        propsPropagationWhitelist={[FormDomain]}
        validate={() => mobilization.custom_domain}
      >
        <FormDomainImplementation
          {...formProps}
          FormComponent={FlatForm}
          titleText='Configure seu domínio'
        />
      </StepContent>

      <StepContent
        title='Insira o domínio desejado'
        validate={() => false}
      >
        {/*<FormShare
          {...formProps}
          FormComponent={FlatForm}
          fields={fields}
          mobilization={mobilization}
        />*/}
        <div>
          <p>1. Faça login no seu provedor de DNS (onde seu domínio está registrado, por exemplo GoDaddy, Locaweb, RegistroBR)</p>
          <p>2. Encontre a página de <b>gerenciador de DNS</b>, e altere os <b>nomes de servidor</b> para os servidores do Bonde:</p>
          <br />
          <p>ns1.1098.19872.0871.98</p>
          <p>ns2.1098.19872.0871.98</p>
          <p>ns3.1098.19872.0871.98</p>
        </div>
        <StepButton>Continuar</StepButton>
      </StepContent>

      <StepContent title='Altere os servidores no seu provedor DNS'>
        <div>
          <p>1. Faça login no seu provedor de DNS (onde seu domínio está registrado, por exemplo GoDaddy, Locaweb, RegistroBR)</p>
          <p>2. Encontre a página de <b>gerenciador de DNS</b>, e altere os <b>nomes de servidor</b> para os servidores do Bonde:</p>
          <br />
          <p>ns1.1098.19872.0871.98</p>
          <p>ns2.1098.19872.0871.98</p>
          <p>ns3.1098.19872.0871.98</p>
        </div>
        <StepButton>Continuar</StepButton>
      </StepContent>
    </StepsContainerStack>
  )
}

export default PageDomain
