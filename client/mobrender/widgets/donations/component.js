import PropTypes from 'prop-types'
import React from 'react'

import {
  FormGroup,
  ControlLabel,
  HelpBlock,
  FormControl,
  RadioGroup,
  Radio,
  ColorPicker
} from '~client/components/forms'
import { SettingsForm } from '~client/ux/components'
import { HorizontalLayout } from '~client/components/grids'

const DonationSettingsPage = props => {
  const {
    dispatch,
    fields: {
      call_to_action: callToAction,
      button_text: buttonText,
      main_color: mainColor,
      default_donation_value: defaultDonationValue,
      donation_value1: donationValue1,
      donation_value2: donationValue2,
      donation_value3: donationValue3,
      donation_value4: donationValue4,
      donation_value5: donationValue5,
      recurring_period: recurringPeriod,
      payment_methods: paymentMethods,
      payment_type: paymentType,
      goal_date_limit: goalDateLimit,
      goal
    },
    ...formProps
  } = props
  const { mobilization: { color_scheme: colorScheme } } = props
  const donationValueTitle = 'Clique para definir este valor como padrão.'

  return (
    <SettingsForm
      {...formProps}
      buttonText='Salvar'
      onSubmit={values => {
        const { widget, asyncWidgetUpdate } = props
        const settings = widget.settings || {}

        return asyncWidgetUpdate({
          ...widget,
          settings: { ...settings, ...values },
          goal: String(values.goal).replace(/,/g, '.')
        })
      }}
      successMessage='Formulário de doação configurado com sucesso!'
    >
      <FormGroup controlId='payment-type-id' {...paymentType}>
        <ControlLabel>Tipo de doação</ControlLabel>
        <RadioGroup>
          <Radio value='unique'>Única</Radio>
          <Radio value='recurring'>Recorrente</Radio>
          <Radio value='users_choice'>Usuário escolhe</Radio>
        </RadioGroup>
      </FormGroup>

      {!(paymentType.value === 'recurring' || paymentType.value === 'users_choice') ? '' : (
        <FormGroup controlId='payment-type-id' {...recurringPeriod}>
          <ControlLabel>Intervalo da recorrência</ControlLabel>
          <RadioGroup>
            <Radio value='30'>Mensal</Radio>
            <Radio value='180'>Semestral</Radio>
            <Radio value='365'>Anual</Radio>
          </RadioGroup>
        </FormGroup>
      )}

      <div className='clearfix mxn1'>
        <FormGroup
          className='col col-12 lg-col-6'
          controlId='goal-value'
          style={{ paddingLeft: '.5rem', paddingRight: '.5rem' }}
          {...goal}
        >
          <ControlLabel>Meta da campanha</ControlLabel>
          <FormControl type='text' placeholder='Ex.: 50000' />
        </FormGroup>

        <FormGroup
          className='col col-12 lg-col-6'
          controlId='goal-date-limit-value'
          style={{ paddingLeft: '.5rem', paddingRight: '.5rem' }}
          {...goalDateLimit}
        >
          <ControlLabel>Prazo de arrecadação</ControlLabel>
          <FormControl type='text' placeholder='Ex.: DD/MM/AAAA' />
        </FormGroup>
      </div>

      <FormGroup controlId='default-donation-value' {...defaultDonationValue}>
        <ControlLabel>Valores das doações</ControlLabel>
        <HelpBlock>
          Você pode ter até 5 valores por bloco de doação. Preencha apenas com números
          inteiros (Ex: 50)
        </HelpBlock>
        <HorizontalLayout cols={5}>
          <FormGroup controlId='donation-value1-id' {...donationValue1}>
            <ControlLabel>Valor 1</ControlLabel>
            <FormControl placeholder='R$20' />
          </FormGroup>
          <FormGroup controlId='donation-value2-id' {...donationValue2}>
            <ControlLabel>Valor 2</ControlLabel>
            <FormControl placeholder='R$50' />
          </FormGroup>
          <FormGroup controlId='donation-value3-id' {...donationValue3}>
            <ControlLabel>Valor 3</ControlLabel>
            <FormControl placeholder='R$100' />
          </FormGroup>
          <FormGroup controlId='donation-value4-id' {...donationValue4}>
            <ControlLabel>Valor 4</ControlLabel>
            <FormControl placeholder='R$200' />
          </FormGroup>
          <FormGroup controlId='donation-value5-id' {...donationValue5}>
            <ControlLabel>Valor 5</ControlLabel>
            <FormControl placeholder='R$500' />
          </FormGroup>
        </HorizontalLayout>
        <RadioGroup className='flex flex-wrap'>
          <Radio className='col col-2' title={donationValueTitle} value='1'>Default</Radio>
          <Radio className='col col-2' title={donationValueTitle} value='2'>Default</Radio>
          <Radio className='col col-2' title={donationValueTitle} value='3'>Default</Radio>
          <Radio className='col col-2' title={donationValueTitle} value='4'>Default</Radio>
          <Radio className='col col-2' title={donationValueTitle} value='5'>Default</Radio>
        </RadioGroup>
        <HelpBlock>*todos os valores são em reais</HelpBlock>
      </FormGroup>

      <FormGroup controlId='title-text-id' {...callToAction}>
        <ControlLabel>Título da caixa de doação</ControlLabel>
        <FormControl type='text' placeholder='Ex.: Escolha um valor e contribua agora!' />
      </FormGroup>

      <FormGroup controlId='main-color-id' {...mainColor}>
        <ControlLabel>Cor da caixa de doação</ControlLabel>
        <HelpBlock>
          Selecione a cor no box abaixo ou insira o valor em hex, por exemplo: #DC3DCE.
        </HelpBlock>
        <ColorPicker
          dispatch={dispatch}
          theme={colorScheme.replace('-scheme', '')}
        />
      </FormGroup>

      <FormGroup controlId='button-text-id' {...buttonText}>
        <ControlLabel>Texto do botão de confirmação</ControlLabel>
        <FormControl type='text' placeholder='Ex.: Doe agora!' />
      </FormGroup>

      <FormGroup controlId='payment-methods-id' {...paymentMethods}>
        <ControlLabel>Habilitar pagamento por boleto?</ControlLabel>
        <HelpBlock>Cada boleto pago terá um custo adicional de R$3,00</HelpBlock>
        <RadioGroup>
          <Radio value='true'>Sim</Radio>
          <Radio value='false'>Não</Radio>
        </RadioGroup>
      </FormGroup>

      <FormGroup>
        <ControlLabel>Conta bancária</ControlLabel>
        <HelpBlock>
          Esta campanha está associada à conta bancária cadastrada nas configurações
          dessa comunidade ;)
        </HelpBlock>
      </FormGroup>
    </SettingsForm>
  )
}

DonationSettingsPage.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  error: PropTypes.string,
  // Injected by container
  mobilization: PropTypes.object.isRequired,
  widget: PropTypes.object.isRequired,
  asyncWidgetUpdate: PropTypes.func.isRequired
}

export default DonationSettingsPage
