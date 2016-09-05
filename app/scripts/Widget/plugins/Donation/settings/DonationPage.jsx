import React, { PropTypes } from 'react'
import classnames from 'classnames'
import { reduxForm } from 'redux-form'

import * as WidgetActions from '../../../actions'
import * as Paths from '../../../../Paths'

import { Loading, CloseButton } from '../../../../components'
import Menu from '../components/settings/Menu.jsx'

import {
  FormRedux,
  FormGroup,
  ControlLabel,
  HelpBlock,
  FormControl,
  ColorPicker,
  RadioGroup,
  Radio
} from '../../../../Dashboard/Forms'

import {
  HorizontalLayout
} from '../../../../Dashboard/Grids'


class DonationPage extends React.Component {

  handleSubmit(values) {
    const { widget, credentials, editWidgetAsync, ...props } = this.props
    const settings = widget.settings || {}
    const data = { ...widget, settings: { ...settings, ...values } }
    return editWidgetAsync(data)
  }

  render() {
    const {
      fields: {
        title_text, button_text, main_color, default_donation_value, donation_value1,
        donation_value2, donation_value3, donation_value4, donation_value5, recurring_period,
        payment_methods, payment_type
      },
      ...props
    } = this.props

    return (
      <div className="flex-auto flex flex-column bg-silver gray relative">
        <Menu mobilization={props.mobilization} widget={props.widget} {...props} />
        <div className="p3 flex-auto overflow-scroll">
          <FormRedux onSubmit={::this.handleSubmit} {...props}>
            <FormGroup controlId="title-text-id" {...title_text}>
              <ControlLabel>Título do bloco de doação</ControlLabel>
              <FormControl type="text" placeholder="Ex.: Escolha um valor e contribua agora!" />
            </FormGroup>

            <FormGroup controlId="payment-type-id" {...payment_type}>
              <ControlLabel>Tipo de doação</ControlLabel>
              <RadioGroup>
                <Radio value="unique">Única</Radio>
                <Radio value="recurring">Recorrente</Radio>
                <Radio value="users_choice">Usuário escolhe</Radio>
              </RadioGroup>
            </FormGroup>

            {(payment_type.value == 'recurring' || payment_type.value == 'users_choice') ?
            <FormGroup controlId="payment-type-id" {...recurring_period}>
              <ControlLabel>Intervalo da recorrência</ControlLabel>
              <RadioGroup>
                <Radio value="30">Mensal</Radio>
                <Radio value="180">Semestral</Radio>
                <Radio value="365">Anual</Radio>
              </RadioGroup>
            </FormGroup> : ''}

            <FormGroup controlId="main-color-id" {...main_color}>
              <ControlLabel>Defina a cor da página de pagamento</ControlLabel>
              <HelpBlock>Selecione a cor no box abaixo ou insira o valor em hex, por exemplo: #DC3DCE.</HelpBlock>
              <ColorPicker />
            </FormGroup>

            <FormGroup controlId="default-donation-value" {...default_donation_value}>
              <ControlLabel>Defina os valores para o bloco de doação</ControlLabel>
              <HelpBlock>Você pode ter até 5 valores por bloco de doação. Preencha apenas com números inteiros (Ex: 50)</HelpBlock>
              <HorizontalLayout cols={5}>
                <FormGroup controlId="donation-value1-id" {...donation_value1}>
                  <ControlLabel>Valor 1</ControlLabel>
                  <FormControl type="number" placeholder="Ex.: R$20" />
                </FormGroup>
                <FormGroup controlId="donation-value2-id" {...donation_value2}>
                  <ControlLabel>Valor 2</ControlLabel>
                  <FormControl type="number" placeholder="Ex.: R$50" />
                </FormGroup>
                <FormGroup controlId="donation-value3-id" {...donation_value3}>
                  <ControlLabel>Valor 3</ControlLabel>
                  <FormControl type="number" placeholder="Ex.: R$100" />
                </FormGroup>
                <FormGroup controlId="donation-value4-id" {...donation_value4}>
                  <ControlLabel>Valor 4</ControlLabel>
                  <FormControl type="number" placeholder="Ex.: R$200" />
                </FormGroup>
                <FormGroup controlId="donation-value5-id" {...donation_value5}>
                  <ControlLabel>Valor 5</ControlLabel>
                  <FormControl type="number" placeholder="Ex.: R$500" />
                </FormGroup>
              </HorizontalLayout>
              <RadioGroup className="flex flex-wrap" style={{marginTop: '-1rem' }}>
                <Radio className="sm-col sm-col-2" title="Clique para definir este valor como padrão." value="1">Definir como padrão</Radio>
                <Radio className="sm-col sm-col-2" title="Clique para definir este valor como padrão." value="2">Definir como padrão</Radio>
                <Radio className="sm-col sm-col-2" title="Clique para definir este valor como padrão." value="3">Definir como padrão</Radio>
                <Radio className="sm-col sm-col-2" title="Clique para definir este valor como padrão." value="4">Definir como padrão</Radio>
                <Radio className="sm-col sm-col-2" title="Clique para definir este valor como padrão." value="5">Definir como padrão</Radio>
              </RadioGroup>
              <HelpBlock>*todos os valores são em reais</HelpBlock>
            </FormGroup>

            <FormGroup controlId="button-text-id" {...button_text}>
              <ControlLabel>Texto do botão de doação</ControlLabel>
              <FormControl type="text" placeholder="Ex.: Doe agora!" />
            </FormGroup>

            <FormGroup controlId="payment-methods-id" {...payment_methods}>
              <ControlLabel>Habilitar pagamento por boleto?</ControlLabel>
              <HelpBlock>Cada boleto pago terá um custo adicional de R$3,00</HelpBlock>
              <RadioGroup>
                <Radio value="true">Sim</Radio>
                <Radio value="false">Não</Radio>
              </RadioGroup>
            </FormGroup>

            <FormGroup>
              <ControlLabel>Conta bancária</ControlLabel>
              <HelpBlock className="mb3">Este bloco de doação está associado à conta correspondente da cidade no Pagar.me.</HelpBlock>
            </FormGroup>
          </FormRedux>
        </div>
        <CloseButton dirty={props.dirty} path={Paths.editMobilization(props.mobilization.id)} />
      </div>
    )
  }
}

DonationPage.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  error: PropTypes.string,

  mobilization: PropTypes.object.isRequired,
  widget: PropTypes.object.isRequired,
  credentials: PropTypes.object.isRequired,
}

const fields = [
  'title_text', 'button_text', 'main_color', 'default_donation_value',
  'donation_value1', 'donation_value2', 'donation_value3', 'donation_value4',
  'donation_value5', 'recurring_period', 'payment_type', 'payment_methods'
]

const validate = values => {
  const errors = {}
  if (!values.button_text) {
    errors.button_text = 'Insira o texto do botão'
  } else if (values.button_text.length > 50) {
    errors.button_text = 'O limite de caracteres foi atingido.'
  }
  return errors
}

export default reduxForm({
  form: 'widgetForm',
  fields,
  validate
},
(state, ownProps) => ({
  initialValues: {
    default_donation_value: 1,
    main_color: '#54d0f6',
    recurring_period: 30,
    payment_type: 'unique',
    payment_methods: 'false',
    ...ownProps.widget.settings || {}
  },
  credentials: state.auth.credentials,
}), { ...WidgetActions })(DonationPage)
