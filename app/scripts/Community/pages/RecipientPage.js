import React, { Component } from 'react'
import { reduxForm } from 'redux-form'

import {
  FormRedux,
  SubmitButton,
  FormGroup,
  FormControl,
  ControlLabel,
  UploadImageField,
  SuccessMessage,
  RadioGroup,
  Radio
} from '../../Dashboard/Forms'
import { getCodeBanks } from '../utils'
import { FloatLayout } from '../../Dashboard/Grids'

import { edit } from '../actions'


class RecipientPage extends Component {

  render() {
    const {
      fields: {
        recipient: {
          transfer_interval,
          transfer_day,
          transfer_enabled,
          bank_account
        }
      },
      ...formProps
    } = this.props

    return (
      <FormRedux nosubmit {...formProps}>

        <FormGroup controlId="transferIntervalId" {...transfer_interval}>
          <ControlLabel>Intervalo</ControlLabel>
          <RadioGroup layout="horizontal">
            <Radio value="weekly">Semanalmente</Radio>
            <Radio value="monthly">Mensalmente</Radio>
          </RadioGroup>
        </FormGroup>

        <FormGroup controlId="transferDayId" {...transfer_day}>
          <ControlLabel>Dia de transferência</ControlLabel>
          <FormControl type="number" />
        </FormGroup>

        {/*<FormGroup controlId="transferEnabledId" {...transfer_enabled}>
          <ControlLabel>Habilitar transferência</ControlLabel>
          <FormControl type="checkbox" />
        </FormGroup>*/}

        <div className="section">
          <h3>Conta bancaria</h3>
          <hr />
          <div className="flex flex-wrap">
            <div className="col col-10 pr1">
              <FormGroup controlId="bankCodeId" {...bank_account.bank_code}>
                <ControlLabel>Banco</ControlLabel>
                <FormControl componentClass="select">
                  <option value="">Selecione o banco</option>
                  {getCodeBanks().map(bank => (
                    <option value={bank.code}>{`${bank.code} - ${bank.name}`}</option>
                  ))}
                </FormControl>
              </FormGroup>
            </div>
            <div className="col col-2">
              <FormGroup controlId="bankAccountTypeId" {...bank_account.type}>
                <ControlLabel>Tipo de conta</ControlLabel>
                <RadioGroup layout="vertical">
                  <Radio value="conta_corrente">Corrente</Radio>
                  <Radio value="conta_poupanca">Poupança</Radio>
                </RadioGroup>
              </FormGroup>
            </div>
          </div>
          <div className="flex flex-wrap">
            <div className="col col-10 pr1">
              <FormGroup controlId="bankAgencyId" {...bank_account.agencia}>
                <ControlLabel>Agência</ControlLabel>
                <FormControl type="text" />
              </FormGroup>
            </div>
            <div className="col col-2">
              <FormGroup controlId="bankAgencyDvId" {...bank_account.agencia_dv}>
                <ControlLabel>Digíto</ControlLabel>
                <FormControl type="text" />
              </FormGroup>
            </div>
          </div>
          <div className="flex flex-wrap">
            <div className="col col-10 pr1">
              <FormGroup controlId="bankAccountId" {...bank_account.conta}>
                <ControlLabel>Conta</ControlLabel>
                <FormControl type="text" />
              </FormGroup>
            </div>
            <div className="col col-2">
              <FormGroup controlId="bankAccountDvId" {...bank_account.conta_dv}>
                <ControlLabel>Digíto</ControlLabel>
                <FormControl type="text" />
              </FormGroup>
            </div>
          </div>
          <FormGroup controlId="bankLegalNameId" {...bank_account.legal_name}>
            <ControlLabel>Nome / Razão Social</ControlLabel>
            <FormControl type="text" />
          </FormGroup>
          <FormGroup controlId="bankDocumentNumberId" {...bank_account.document_number}>
            <ControlLabel>CPF / CNPJ</ControlLabel>
            <FormControl type="text" />
          </FormGroup>
        </div>

        <FloatLayout position="floatTopRight">
          <SubmitButton>Salvar</SubmitButton>
          <SuccessMessage text="Dados editados com sucesso." />
        </FloatLayout>
      </FormRedux>
    )
  }
}

const fields = [
  'id',
  'recipient.transfer_interval',
  'recipient.transfer_day',
  'recipient.transfer_enabled',
  'recipient.bank_account.bank_code',
  'recipient.bank_account.agencia',
  'recipient.bank_account.agencia_dv',
  'recipient.bank_account.conta',
  'recipient.bank_account.conta_dv',
  'recipient.bank_account.type',
  'recipient.bank_account.legal_name',
  'recipient.bank_account.document_number',
]

const mapStateToProps = (state, ownProps) => {

  const { community: { id, recipient } } = ownProps
  const values = recipient ? recipient : {}

  return {
    initialValues: {
      id,
      recipient: {
        ...values,
        transfer_interval: values.transfer_interval || 'monthly',
        transfer_day: values.transfer_day || 5,
        transfer_enabled: values.transfer_enabled || true,
      },
    },
  }
}

export default reduxForm({
  form: 'recipientForm',
  fields
}, mapStateToProps, { submit: edit })(RecipientPage)

/*"transfer_interval": "weekly",
      "transfer_day": 5,
      "transfer_enabled": true,
      "recipient": {
          :bank_code => '237',
          :agencia => '1935',
          :agencia_dv => '9',
          :conta => '23398',
          :conta_dv => '9',
          :type => 'conta_corrente',
          :legal_name => 'foo bar loem',
          :document_number => '111.111.111-11'
        }*/
