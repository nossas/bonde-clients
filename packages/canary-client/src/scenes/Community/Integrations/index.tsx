import React from 'react';
import { Container, Row, Col } from 'react-grid-system';
import CommunityForm from '../BaseForm';
import Mailchimp from './Mailchimp';
import Twilio from './Twilio';

const SettingsPage = () => (
  <CommunityForm omitButton>
    <Container fluid style={{ width: '100%', padding: '0' }}>
      <Row>
        <Col sm={12}>
          <Mailchimp />
        </Col>
        <Col sm={12}>
          <Twilio />
        </Col>
      </Row>
    </Container>
  </CommunityForm>
);

// TODO:
// - Translate
// - Validate (+phone)
// - Hint

export default SettingsPage;
