import React from 'react';
import { Button, InputField, Validators, Header, Text } from 'bonde-components';
import { Container, Row, Col } from 'react-grid-system';
import { useTranslation } from 'react-i18next';
import CommunityForm from '../BaseForm';
import Panel, { Section } from '../Panel';
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
    <CommunityForm omitButton>
      <Container fluid style={{ width: '100%', padding: '0' }}>
        <Panel>
          <Section>
            <Header.H4>{t('recipient.form.titles.account')}</Header.H4>
            <Row>
              <Col xs={12} md={6} style={{ marginBottom: '15px' }}>
                <Text>Insira os dados da sua conta bancária para começar a receber doações pela ferramenta de crowdfunding.</Text>
              </Col>
            </Row>
            <FieldPrefix prefix='community.recipient.bank_account'>
              <Row>
                <Col xs={12} sm={6}>
                  <PrefixedField
                    name='bank_code'
                    label={t('recipient.form.fields.bank_account.bank_code.label')}
                    component={BankField}
                    emptyText={t('recipient.form.fields.bank_account.bank_code.options.empty')}
                    validate={required(t('recipient.form.fields.bank_account.bank_code.errors.required'))}
                  />
                </Col>
                <Col xs={12} sm={6}>
                  <PrefixedField
                    name='type'
                    label={t('recipient.form.fields.bank_account.type.label')}
                    component={SelectField}
                  >
                    <option value='conta_corrente'>{t('recipient.form.fields.bank_account.type.options.conta_corrente')}</option>
                    <option value='conta_poupanca'>{t('recipient.form.fields.bank_account.type.options.conta_poupanca')}</option>
                  </PrefixedField>
                </Col>
                <Col xs={8} sm={4}>
                  <PrefixedField
                    name='agencia'
                    label={t('recipient.form.fields.bank_account.agencia.label')}
                    placeholder={t('recipient.form.fields.bank_account.agencia.placeholder')}
                    parse={normalize.max(5)}
                    component={InputField}
                    validate={required(t('recipient.form.fields.bank_account.agencia.errors.required'))}
                  />
                </Col>
                <Col xs={4} sm={2}>
                  <PrefixedField
                    name='agencia_dv'
                    label={t('recipient.form.fields.bank_account.agencia_dv.label')}
                    placeholder='Ex: 0'
                    parse={normalize.max(1)}
                    component={InputField}
                  />
                </Col>
                <Col xs={8} sm={4}>
                  <PrefixedField
                    name='conta'
                    label={t('recipient.form.fields.bank_account.conta.label')}
                    placeholder={t('recipient.form.fields.bank_account.conta.placeholder')}
                    parse={normalize.max(13)}
                    component={InputField}
                    validate={required(t('recipient.form.fields.bank_account.conta.errors.required'))}
                  />
                </Col>
                <Col xs={4} sm={2}>
                  <PrefixedField
                    name='conta_dv'
                    label={t('recipient.form.fields.bank_account.conta_dv.label')}
                    placeholder='Ex: 0'
                    parse={normalize.max(2)}
                    component={InputField}
                    validate={required(t('recipient.form.fields.bank_account.conta_dv.errors.required'))}
                  />
                </Col>
                <Col xs={12} sm={6}>
                  <PrefixedField
                    name='legal_name'
                    label={t('recipient.form.fields.bank_account.legal_name.label')}
                    placeholder={t('recipient.form.fields.bank_account.legal_name.placeholder')}
                    component={InputField}
                    validate={required(t('recipient.form.fields.bank_account.legal_name.errors.required'))}
                  />
                </Col>
                <Col xs={12} sm={6}>
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
                </Col>
              </Row>
              <Row justify='end'>
                <Col xs={6} sm={4} md={3} lg={2}>
                  <Button type='submit'>{t('buttons.submit')}</Button>
                </Col>
              </Row>
            </FieldPrefix>
          </Section>
        </Panel>
        <Panel>
          <Row>
            <Col xs={12} sm={6}>
              <Section>
                <Header.H4>{t('recipient.form.titles.transfer_date')}</Header.H4>
                <Row>
                  <Col xs={12} style={{ marginBottom: '15px' }}>
                    <Text className='about'>Defina o dia em que o valor arrecadado pela sua comunidade será automaticamente transferido para a conta cadastrada aqui.</Text>
                  </Col>
                </Row>
                <FieldPrefix prefix="community.recipient">
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
                  <Row justify='end'>
                    <Col xs={6} sm={6} md={6} lg={4}>
                      <Button type='submit'>{t('buttons.submit')}</Button>
                    </Col>
                  </Row>
                </FieldPrefix>
              </Section>
            </Col>
            <Col xs={12} sm={4} offset={{ sm: 2 }}>
              <Section>
                <Header.H5>Observações</Header.H5>
                <ul>
                  <li>
                    <Text>As doações só ficam disponíveis 31 dias após a transação de cartão de crédito ter sido criada (29 dias corridos + 2 dias úteis) no caso de transações com uma parcela e 2 dias úteis após o pagamento do boleto bancário.</Text>
                  </li>
                  <li>
                    <Text>Caso a transação tenha de 2 a 12 parcelas, o recebimento normal será assim: primeira parcela em 31 dias, segunda em 61, terceira em 91, e assim por diante.</Text>
                  </li>
                </ul>
              </Section>
            </Col>
          </Row>
        </Panel>
      </Container>
    </CommunityForm>
  );
}

// TODO:
// - Translate
// - Validate
// - Hint

export default RecipientPage;
