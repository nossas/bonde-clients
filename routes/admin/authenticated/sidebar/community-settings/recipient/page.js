import PropTypes from 'prop-types'
import React from 'react'
import uuid from 'uuid'
import { FormattedMessage } from 'react-intl'
import { Warning } from '~client/components/notify'
import { FormGroup, FormControl, ControlLabel, RadioGroup, Radio } from '~client/components/forms'
import { SettingsForm } from '~client/ux/components'
import { getCodeBanks } from '~client/community/utils'

const CommunitySettingsRecipientPage = ({
  fields: {
    recipient: {
      transfer_interval: transferInterval,
      transfer_day: transferDay,
      transfer_enabled: transferEnabled,
      bank_account
    }
  },
  location,
  ...formProps
}) => (
  <SettingsForm {...formProps}>
    <h2 className='mt0'>
      <FormattedMessage
        id='page--community-recipient.title'
        defaultMessage='Agendamento dos Saques'
      />
    </h2>
    <h5>
      <FormattedMessage
        id='page--community-recipient.subtitle'
        defaultMessage={
          'Atenção: As doações só ficam disponíveis 31 dias após a transação de cartão de ' +
          'crédito ter sido criada (29 dias corridos + 2 dias úteis) no caso de transações ' +
          'com uma parcela e 2 dias úteis após o pagamento do boleto bancário. Caso a ' +
          'transação tenha de 2 a 12 parcelas, o recebimento normal será da seguinte ' +
          'forma: primeira parcela em 31 dias, segunda em 61, terceira em 91, ' +
          'e assim por diante.'
        }
      />
    </h5>

    <div className='flex'>
      <FormGroup {...transferInterval} controlId='transferIntervalId' style={{ width: 190 }}>
        <ControlLabel>Recorrência</ControlLabel>
        <RadioGroup
          layout='horizontal'
          style={{
            marginBottom: 0,
            height: 50,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Radio value='weekly'>Semanal</Radio>
          <Radio value='monthly'>Mensal</Radio>
        </RadioGroup>
      </FormGroup>

      <FormGroup {...transferDay} className='flex-auto'>
        <ControlLabel>Dia de execução</ControlLabel>
        {transferInterval.value === 'weekly' ? (
          <FormControl componentClass='select'>
            <option value='1'>Segunda</option>
            <option value='2'>Terça</option>
            <option value='3'>Quarta</option>
            <option value='4'>Quinta</option>
            <option value='5'>Sexta</option>
          </FormControl>
        ) : (
          <FormControl componentClass='select'>
            <option value='1'>1</option>
            <option value='6'>6</option>
            <option value='11'>11</option>
            <option value='16'>16</option>
            <option value='21'>21</option>
            <option value='26'>26</option>
          </FormControl>
        )}
      </FormGroup>
    </div>


    <div className='section'>
      <h2>Conta bancaria</h2>
      <h5>
        As doações só serão recebidas após o preenchimento dos dados bancários.
      </h5>
      <Warning title='Importante'>
        As doações recebidas por uma conta bancária não podem ser transferidas
        para outra após ela ter sido realizada, ou seja, após serem realizadas as doações
        o saque sempre será feito para a conta bancária definida no momento da doação.
      </Warning>

      <div className='flex'>
        <FormGroup controlId='bankAccountTypeId' {...bank_account.type} style={{ width: 240 }}>
          <ControlLabel>Tipo de conta</ControlLabel>
          <RadioGroup
            layout='horizontal'
            style={{
              marginBottom: 0,
              height: 50,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Radio value='conta_corrente'>Corrente</Radio>
            <Radio value='conta_poupanca'>Poupança</Radio>
          </RadioGroup>
        </FormGroup>

        <FormGroup className='flex-auto' controlId='bankCodeId' {...bank_account.bank_code}>
          <ControlLabel>Banco</ControlLabel>
          <FormControl componentClass='select'>
            <option value=''>Selecione o banco</option>
            {getCodeBanks(bank => !isNaN(bank.code) && bank.code.length === 3).map(bank => (
              <option key={uuid()} value={bank.code}>
                {`${bank.code} - ${bank.name}`}
              </option>
            ))}
          </FormControl>
        </FormGroup>
      </div>

      <div className='flex flex-wrap mxn2'>
        <div className='col col-12 lg-col-6 px2'>
          <div className='col col-10 pr1'>
            <FormGroup controlId='bankAgencyId' {...bank_account.agency}>
              <ControlLabel>Agência</ControlLabel>
              <FormControl type='text' placeholder='Digite apenas números' />
            </FormGroup>
          </div>

          <div className='col col-2'>
            <FormGroup controlId='bankAgencyDvId' {...bank_account.agency_dig}>
              <ControlLabel>Dígito</ControlLabel>
              <FormControl type='text' placeholder='Ex: 0' />
            </FormGroup>
          </div>
        </div>

        <div className='col col-12 lg-col-6 px2'>
          <div className='col col-8 pr1'>
            <FormGroup controlId='bankAccountId' {...bank_account.account}>
              <ControlLabel>Conta</ControlLabel>
              <FormControl type='text' placeholder='Digite apenas números' />
            </FormGroup>
          </div>

          <div className='col col-4'>
            <FormGroup controlId='bankAccountDvId' {...bank_account.account_dig}>
              <ControlLabel>Dígito</ControlLabel>
              <FormControl type='text' placeholder='Ex: 00' />
            </FormGroup>
          </div>
        </div>
      </div>

      <div className='flex flex-wrap mxn2'>
        <div className='col col-12 lg-col-6 px2'>
          <FormGroup controlId='bankLegalNameId' {...bank_account.legal_name}>
            <ControlLabel>Nome / Razão Social</ControlLabel>
            <FormControl type='text' placeholder='Ex: Minha Sampa' />
          </FormGroup>
        </div>

        <div className='col col-12 lg-col-6 px2'>
          <FormGroup controlId='bankDocumentNumberId' {...bank_account.document_number}>
            <ControlLabel>CPF / CNPJ</ControlLabel>
            <FormControl type='text' placeholder='Digite apenas números' />
          </FormGroup>
        </div>
      </div>
    </div>
  </SettingsForm>
)

CommunitySettingsRecipientPage.propTypes = {
  fields: PropTypes.shape({
    recipient: PropTypes.shape({
      transfer_interval: PropTypes.object.isRequired,
      transfer_day: PropTypes.object.isRequired,
      transfer_enabled: PropTypes.object.isRequired,
      bank_account: PropTypes.object.isRequired
    }).isRequired
  }).isRequired,
  // redux-form required props
  submit: PropTypes.func.isRequired
}

export default CommunitySettingsRecipientPage
