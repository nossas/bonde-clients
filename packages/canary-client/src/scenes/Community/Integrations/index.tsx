import React from 'react';
import { InputField, Header } from 'bonde-components';
import { Container, Row, Col } from 'react-grid-system';
import CommunityForm from '../BaseForm';
import Panel from '../Panel';

const SettingsPage = () => {
  return (
    <CommunityForm>
      <Container fluid style={{ width: '100%', padding: '0' }}>
        <Row>
          <Col sm={12}>
            <Header.h3 margin="0 0 25px 0">Mailchimp</Header.h3>
            <Panel>
              <InputField
                name='community.mailchimp_api_key'
                label='Mailchimp API Key'
                placeholder='Insira aqui o conteúdo de "API key"'
                />
              <InputField
                name='community.mailchimp_list_id'
                label='Mailchimp ID da lista'
                placeholder='Insira aqui o "ID da lista"'
                />
            </Panel>
          </Col>
          <Col sm={12}>
            <Header.h3>Twilio</Header.h3>
            <Panel>
              <InputField
                name='community.twilio_account_sid'
                label='Twilio Account SID'
                placeholder='Ex: ACe4________6835_______2277_______'
              />
              <InputField
                name='community.twilio_auth_token'
                label='Twilio Auth Token'
                placeholder='Ex: ecd5_______a82c_______b9c9______'
              />
              <InputField
                name='community.twilio_number'
                label='Twilio Number'
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
