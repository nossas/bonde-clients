import React from 'react';
import { InputField } from 'bonde-components';
import { Container, Row, Col } from 'react-grid-system';
import CommunityForm from '../BaseForm';
import SelectField from '../SelectField';
import ScheduleField from './ScheduleField';
import BankField from './BankField';
import { FieldPrefix, PrefixedField } from './FieldPrefix';
import * as normalize from './normalize';

const RecipientPage = () => {
  return (
    <CommunityForm>
      <Container fluid style={{ width: '100%', padding: '0' }}>
        {/** Should respect order */}
        <ScheduleField
          title="Agendamento dos Saques"
          interval={{
            name: 'community.recipient.transfer_interval',
            label: 'Recorrência'
          }}
          day={{
            name: 'community.recipient.transfer_day',
            label: 'Dia de execução'
          }}
        />
        <FieldPrefix prefix='community.recipient.bank_account' title='Conta bancária'>
          <Row>
            <Col sm={8}>
              <PrefixedField
                name='bank_code'
                label='Banco'
                component={BankField}
              />
            </Col>
            <Col sm={4}>
              <PrefixedField
                name='type'
                label='Tipo de conta'
                component={SelectField}
              >
                <option value='conta_corrente'>Corrente</option>
                <option value='conta_poupanca'>Poupança</option>
              </PrefixedField>
            </Col>
          </Row>
          <Row>
            <Col sm={3}>
              <PrefixedField
                name='agencia'
                label='Agência'
                placeholder='Digite apenas números'
                parse={normalize.max(5)}
                component={InputField}
              />
            </Col>
            <Col sm={2}>
              <PrefixedField
                name='agencia_dv'
                label='Dígito'
                placeholder='Ex: 0'
                parse={normalize.max(1)}
                component={InputField}
              />
            </Col>
            <Col sm={5}>
              <PrefixedField
                name='conta'
                label='Conta'
                placeholder='Digite apenas números'
                parse={normalize.max(13)}
                component={InputField}
              />
            </Col>
            <Col sm={2}>
              <PrefixedField
                name='conta_dv'
                label='Dígito'
                placeholder='Ex: 0'
                parse={normalize.max(2)}
                component={InputField}
              />
            </Col>
          </Row>
          <PrefixedField
            name='legal_name'
            label='Nome / Razão Social'
            placeholder='Ex: Minha Sampa'
            component={InputField}
          />
          <PrefixedField
            name='document_number'
            label='CPF / CNPJ'
            placeholder='Digite apenas números'
            parse={normalize.document}
            component={InputField}
          />
        </FieldPrefix>
      </Container>
    </CommunityForm>
  );
}

// TODO:
// - Translate
// - Validate
// - Hint
// - SelectField

export default RecipientPage;
