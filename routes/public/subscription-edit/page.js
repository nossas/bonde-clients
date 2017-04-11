import React from 'react'
import { Background } from '~client/components/layout'
import { FormGroup, ControlLabel, FormControl } from '~client/components/forms'
import { FlatForm } from '~client/ux/components'

const SubscriptionEditPage = ({ fields: { dummy }, ...formProps }) => (
  <Background image={require('exenv').canUseDOM ? require('~client/images/bg-login.png') : ''}>
    <FlatForm
      {...formProps}
      buttonText='Salvar'
    >
      <FormGroup controlId='dummy' {...dummy}>
        <ControlLabel>Domínio personalizado</ControlLabel>
        <FormControl
          type='text'
          placeholder='www.meudominio.com.br'
        />
      </FormGroup>
    </FlatForm>
  </Background>
)
export default SubscriptionEditPage
