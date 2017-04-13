import React from 'react'
import { Background } from '~client/components/layout'
import { FormGroup, ControlLabel, FormControl } from '~client/components/forms'
import { FlatForm } from '~client/ux/components'
import { Tabs, TabBorder } from '~client/components/navigation/tabs'
import { Pagarme } from '~client/components/external-services'

const SubscriptionEditPage = ({ fields: { creditcard, name, expiration, cvv }, ...formProps }) => (
  <Background image={require('exenv').canUseDOM ? require('~client/images/bg-login.png') : ''}>
    <Pagarme />
    <FlatForm
      {...formProps}
      buttonText='Salvar'
      titleText='Dados da Assinatura'
      titleSmallMargin
    >
      <Tabs className='mb3 center'>
        <TabBorder Component='span' isActive>
          Cartão de crédito
        </TabBorder>
        <TabBorder Component='span'>
          Data da recorrência
        </TabBorder>
      </Tabs>

      <p className='mb3 lightgray'>
        Altere os dados do seu cartão de crédito preenchendo o formulário abaixo. A sua assinatura
        permanecerá a mesma porém, à partir do momento que você salvar o formulário abaixo, o valor
        será cobrado no seu novo cartão.
      </p>

      <FormGroup className='mb2' controlId='creditcard' {...creditcard}>
        <ControlLabel>Número</ControlLabel>
        <FormControl
          type='text'
          placeholder='Ex: 0000 0000 0000 0000'
        />
      </FormGroup>

      <FormGroup className='mb2' controlId='name' {...name}>
        <ControlLabel>Nome</ControlLabel>
        <FormControl
          type='text'
          placeholder='(igual no cartão)'
        />
      </FormGroup>

      <div className='clearfix col-12 mb3'>
        <FormGroup className='col col-6' controlId='expiration' {...expiration}>
          <ControlLabel>Validade</ControlLabel>
          <FormControl
            type='text'
            placeholder='00/00'
          />
        </FormGroup>

        <FormGroup className='col col-4 ml3' controlId='cvv' {...cvv}>
          <ControlLabel>CVV</ControlLabel>
          <FormControl
            type='text'
            placeholder='Ex: 000'
          />
        </FormGroup>
      </div>
    </FlatForm>
  </Background>
)
export default SubscriptionEditPage
