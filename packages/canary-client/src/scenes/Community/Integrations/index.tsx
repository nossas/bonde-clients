import React from 'react';
import { InputField, Header } from 'bonde-components';
import { Container, Row, Col } from 'react-grid-system';
import { useTranslation } from 'react-i18next';
import CommunityForm from '../BaseForm';
import Panel from '../Panel';

const SettingsPage = () => {
  const { t } = useTranslation('community');

  return (
    <CommunityForm>
      <Container fluid style={{ width: '100%', padding: '0' }}>
        <Row>
          <Col sm={12}>
            <Header.h3 margin="0 0 25px 0">Mailchimp</Header.h3>
            <Panel>
              <InputField
                name='community.mailchimp_api_key'
                label={t('integrations.form.fields.mailchimp_api_key.label')}
                placeholder={t('integrations.form.fields.mailchimp_api_key.placeholder')}
                />
              <InputField
                name='community.mailchimp_list_id'
                label={t('integrations.form.fields.mailchimp_list_id.label')}
                placeholder={t('integrations.form.fields.mailchimp_list_id.placeholder')}
                />
            </Panel>
          </Col>
          <Col sm={12}>
            <Header.h3>Twilio</Header.h3>
            <Panel>
              <InputField
                name='community.twilio_account_sid'
                label={t('integrations.form.fields.twilio_account_sid.label')}
                placeholder='Ex: ACe4________6835_______2277_______'
              />
              <InputField
                name='community.twilio_auth_token'
                label={t('integrations.form.fields.twilio_auth_token.label')}
                placeholder='Ex: ecd5_______a82c_______b9c9______'
              />
              <InputField
                name='community.twilio_number'
                label={t('integrations.form.fields.twilio_number.label')}
                placeholder='Ex: +5511956781234'
              />
            </Panel>
          </Col>
        </Row>
      </Container>
    </CommunityForm>
  );
}

// TODO:
// - Translate
// - Validate (+phone)
// - Hint

export default SettingsPage;
