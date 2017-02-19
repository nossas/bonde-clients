import React from 'react'
import { reduxForm } from 'redux-form'
import { CPF, CNPJ } from 'cpf_cnpj'

// Global module dependencies
import {
  FormRedux,
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
  SuccessMessage,
  RadioGroup,
  Radio
} from '~components/forms'
import { FloatLayout } from '~components/grids'

// Current module dependencies
import { getCodeBanks } from '../utils'
import { edit } from '../actions'

const RecipientPage = ({
  fields: {
    recipient: {
      transfer_interval: transferInterval,
      transfer_day: transferDay,
      transfer_enabled: transferEnabled,
      bank_account
    }
  },
  ...formProps
}) => (
  <FormRedux nosubmit {...formProps}>
    <FormGroup controlId='transferIntervalId' {...transferInterval}>
      <ControlLabel>Intervalo</ControlLabel>
      <RadioGroup layout='horizontal'>
        <Radio value='weekly'>Semanalmente</Radio>
        <Radio value='monthly'>Mensalmente</Radio>
      </RadioGroup>
    </FormGroup>

    <FormGroup controlId='transferDayId' {...transferDay}>
      <ControlLabel>Dia de transferência</ControlLabel>
      <FormControl type='number' />
    </FormGroup>

    {/* <FormGroup controlId="transferEnabledId" {...transferEnabled}>
      <ControlLabel>Habilitar transferência</ControlLabel>
      <FormControl type="checkbox" />
    </FormGroup> */}

    <div className='section'>
      <h3>Conta bancaria</h3>
      <hr />
      <div className='flex flex-wrap'>
        <div className='col col-10 pr1'>
          <FormGroup controlId='bankCodeId' {...bank_account.bank_code}>
            <ControlLabel>Banco</ControlLabel>
            <FormControl componentClass='select'>
              <option value=''>Selecione o banco</option>
              {getCodeBanks(bank => !isNaN(bank.code) && bank.code.length === 3).map(bank => (
                <option value={bank.code}>{`${bank.code} - ${bank.name}`}</option>
              ))}
            </FormControl>
          </FormGroup>
        </div>
        <div className='col col-2'>
          <FormGroup controlId='bankAccountTypeId' {...bank_account.type}>
            <ControlLabel>Tipo de conta</ControlLabel>
            <RadioGroup layout='vertical'>
              <Radio value='conta_corrente'>Corrente</Radio>
              <Radio value='conta_poupanca'>Poupança</Radio>
            </RadioGroup>
          </FormGroup>
        </div>
      </div>
      <div className='flex flex-wrap'>
        <div className='col col-10 pr1'>
          <FormGroup controlId='bankAgencyId' {...bank_account.agency}>
            <ControlLabel>Agência</ControlLabel>
            <FormControl type='text' />
          </FormGroup>
        </div>
        <div className='col col-2'>
          <FormGroup controlId='bankAgencyDvId' {...bank_account.agency_dig}>
            <ControlLabel>Digíto</ControlLabel>
            <FormControl type='text' />
          </FormGroup>
        </div>
      </div>
      <div className='flex flex-wrap'>
        <div className='col col-10 pr1'>
          <FormGroup controlId='bankAccountId' {...bank_account.account}>
            <ControlLabel>Conta</ControlLabel>
            <FormControl type='text' />
          </FormGroup>
        </div>
        <div className='col col-2'>
          <FormGroup controlId='bankAccountDvId' {...bank_account.account_dig}>
            <ControlLabel>Digíto</ControlLabel>
            <FormControl type='text' />
          </FormGroup>
        </div>
      </div>
      <FormGroup controlId='bankLegalNameId' {...bank_account.legal_name}>
        <ControlLabel>Nome / Razão Social</ControlLabel>
        <FormControl type='text' />
      </FormGroup>
      <FormGroup controlId='bankDocumentNumberId' {...bank_account.document_number}>
        <ControlLabel>CPF / CNPJ</ControlLabel>
        <FormControl type='text' />
      </FormGroup>
    </div>

    <FloatLayout position='floatTopRight'>
      <Button>Salvar</Button>
      <SuccessMessage text='Dados editados com sucesso.' />
    </FloatLayout>
  </FormRedux>
)

const fields = [
  'id',
  'recipient.transfer_interval',
  'recipient.transfer_day',
  'recipient.transfer_enabled',
  'recipient.bank_account.bank_code',
  'recipient.bank_account.agency',
  'recipient.bank_account.agency_dig',
  'recipient.bank_account.account',
  'recipient.bank_account.account_dig',
  'recipient.bank_account.type',
  'recipient.bank_account.legal_name',
  'recipient.bank_account.document_number'
]

const validate = values => {
  const errors = { recipient: { bank_account: {} } }
  const {
    recipient: {
      transfer_day: transferDay,
      bank_account: {
        bank_code: bankCode,
        agency,
        agency_dig: agencyDig,
        account,
        account_dig: accountDig,
        type,
        legal_name: legalName,
        document_number: documentNumber
      }
    }
  } = values

  if (!transferDay) {
    errors.recipient.transfer_day = 'Campo obrigatório'
  }

  if (!bankCode) {
    errors.recipient.bank_account.bank_code = 'Campo obrigatório'
  }

  if (!agency) {
    errors.recipient.bank_account.agency = 'Campo obrigatório'
  } else if (agency.length > 5) {
    errors.recipient.bank_account.agency = 'Deve conter no máximo 5 digitos'
  }
  if (agencyDig && agencyDig.length > 1) {
    errors.recipient.bank_account.agency_dig = 'Deve conter apenas 1 digito'
  }

  if (!account) {
    errors.recipient.bank_account.account = 'Campo obrigatório'
  } else if (account.length > 13) {
    errors.recipient.bank_account.account = 'Deve conter no máximo 13 digitos'
  }
  if (!accountDig) {
    errors.recipient.bank_account.account_dig = 'Campo obrigatório'
  } else if (accountDig.length > 2) {
    errors.recipient.bank_account.account_dig = 'Deve conter no máximo 2 caracteres'
  }

  if (!type) {
    errors.recipient.bank_account.type = 'Campo obrigatório'
  }

  if (!legalName) {
    errors.recipient.bank_account.legal_name = 'Campo obrigatório'
  }

  if (!documentNumber) {
    errors.recipient.bank_account.document_number = 'Campo obrigatório'
  } else if (documentNumber.length > 11 && documentNumber.length !== 14) {
    errors.recipient.bank_account.document_number = 'CNPJ deve conter 14 digitos'
  } else if (documentNumber.length < 11) {
    errors.recipient.bank_account.document_number = 'CPF deve conter 11 digitos'
  } else if (documentNumber.length === 11 && !CPF.isValid(documentNumber)) {
    errors.recipient.bank_account.document_number = 'CPF inválido'
  } else if (documentNumber.length === 14 && !CNPJ.isValid(documentNumber)) {
    errors.recipient.bank_account.document_number = 'CNPJ inválido'
  }

  return errors
}

const mapStateToProps = (state, ownProps) => {
  const { community: { id, recipient } } = ownProps
  const values = recipient || {}

  return {
    initialValues: {
      id,
      recipient: {
        ...values,
        transfer_interval: values.transfer_interval || 'monthly',
        transfer_day: values.transfer_day || 5,
        transfer_enabled: values.transfer_enabled || true
      }
    }
  }
}

export default reduxForm({
  form: 'recipientForm',
  fields,
  validate
}, mapStateToProps, { submit: edit })(RecipientPage)
