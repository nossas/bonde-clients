import React from 'react';
import { InputField, Validators } from 'bonde-components';
import { Container, Row, Col } from 'react-grid-system';
import { useTranslation } from 'react-i18next';
import CommunityForm from '../BaseForm';
import SelectField from '../SelectField';
import SelectFieldCondition from './SelectFieldCondition';
import BankField from './BankField';
import { FieldPrefix, PrefixedField } from './FieldPrefix';
import * as normalize from './normalize';
import { cpfCnpj } from './validators';

const RecipientPage = () => {
  const { t } = useTranslation('community');
  const { composeValidators, required } = Validators;

  return (
    <CommunityForm>
      <Container fluid style={{ width: '100%', padding: '0' }}>
        <FieldPrefix
          prefix="community.recipient"
          title={t('recipient.form.titles.transfer_date')}
        >
          <PrefixedField
            component={SelectField}
            name="transfer_interval"
            label={t('recipient.form.fields.transfer_interval.label')}
          >
            <option value='weekly'>{t('recipient.form.fields.transfer_interval.options.weekly')}</option>
            <option value='monthly'>{t('recipient.form.fields.transfer_interval.options.monthly')}</option>
          </PrefixedField>
          <PrefixedField
            component={SelectFieldCondition}
            parent="community.recipient.transfer_interval"
            name="transfer_day"
            label={t('recipient.form.fields.transfer_day.label')}
          >
            {(value: string) => (
              value === 'weekly' ? (
                <>
                  <option value='1'>{t('recipient.form.fields.transfer_day.options.mon')}</option>
                  <option value='2'>{t('recipient.form.fields.transfer_day.options.tue')}</option>
                  <option value='3'>{t('recipient.form.fields.transfer_day.options.wed')}</option>
                  <option value='4'>{t('recipient.form.fields.transfer_day.options.thu')}</option>
                  <option value='5'>{t('recipient.form.fields.transfer_day.options.fri')}</option>
                </>
              ) : (
                <>
                  <option value='1'>1</option>
                  <option value='6'>6</option>
                  <option value='11'>11</option>
                  <option value='16'>16</option>
                  <option value='21'>21</option>
                  <option value='26'>26</option>
                </>
              )
            )}
          </PrefixedField>
        </FieldPrefix>
        <FieldPrefix
          prefix='community.recipient.bank_account'
          title={t('recipient.form.titles.account')}
        >
          <Row>
            <Col sm={8}>
              <PrefixedField
                name='bank_code'
                label={t('recipient.form.fields.bank_account.bank_code.label')}
                component={BankField}
                emptyText={t('recipient.form.fields.bank_account.bank_code.options.empty')}
                validate={required(t('recipient.form.fields.bank_account.bank_code.errors.required'))}
              />
            </Col>
            <Col sm={4}>
              <PrefixedField
                name='type'
                label={t('recipient.form.fields.bank_account.type.label')}
                component={SelectField}
              >
                <option value='conta_corrente'>{t('recipient.form.fields.bank_account.type.options.conta_corrente')}</option>
                <option value='conta_poupanca'>{t('recipient.form.fields.bank_account.type.options.conta_poupanca')}</option>
              </PrefixedField>
            </Col>
          </Row>
          <Row>
            <Col sm={3}>
              <PrefixedField
                name='agencia'
                label={t('recipient.form.fields.bank_account.agencia.label')}
                placeholder={t('recipient.form.fields.bank_account.agencia.placeholder')}
                parse={normalize.max(5)}
                component={InputField}
                validate={required(t('recipient.form.fields.bank_account.agencia.errors.required'))}
              />
            </Col>
            <Col sm={2}>
              <PrefixedField
                name='agencia_dv'
                label={t('recipient.form.fields.bank_account.agencia_dv.label')}
                placeholder='Ex: 0'
                parse={normalize.max(1)}
                component={InputField}
                validate={required(t('recipient.form.fields.bank_account.agencia_dv.errors.required'))}
              />
            </Col>
            <Col sm={5}>
              <PrefixedField
                name='conta'
                label={t('recipient.form.fields.bank_account.conta.label')}
                placeholder={t('recipient.form.fields.bank_account.conta.placeholder')}
                parse={normalize.max(13)}
                component={InputField}
                validate={required(t('recipient.form.fields.bank_account.conta.errors.required'))}
              />
            </Col>
            <Col sm={2}>
              <PrefixedField
                name='conta_dv'
                label={t('recipient.form.fields.bank_account.conta_dv.label')}
                placeholder='Ex: 0'
                parse={normalize.max(2)}
                component={InputField}
                validate={required(t('recipient.form.fields.bank_account.conta_dv.errors.required'))}
              />
            </Col>
          </Row>
          <PrefixedField
            name='legal_name'
            label={t('recipient.form.fields.bank_account.legal_name.label')}
            placeholder={t('recipient.form.fields.bank_account.legal_name.placeholder')}
            component={InputField}
            validate={required(t('recipient.form.fields.bank_account.legal_name.errors.required'))}
          />
          <PrefixedField
            name='document_number'
            label={t('recipient.form.fields.bank_account.document_number.label')}
            placeholder={t('recipient.form.fields.bank_account.document_number.placeholder')}
            parse={normalize.document}
            component={InputField}
            validate={composeValidators(
              required(t('recipient.form.fields.bank_account.document_number.errors.required')),
              cpfCnpj({
                cpf: t('recipient.form.fields.bank_account.document_number.errors.cpf'),
                cnpj: t('recipient.form.fields.bank_account.document_number.errors.cnpj')
              })
            )}
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

export default RecipientPage;
