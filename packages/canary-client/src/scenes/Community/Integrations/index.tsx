import React, { useState } from "react";
import { Container, Row, Col } from "react-grid-system";
import styled from 'styled-components';
import { Header, Text, Link } from 'bonde-components';
import CommunityForm from "../BaseForm";
import Mailchimp from "./Mailchimp";
import Twilio from "./Twilio";

const MenuStyled = styled.div`
  padding: 20px 0 24px;

  ${Link} {
    margin-right: 15px;
    text-transform: uppercase;
    font-weight: bold;
    color: #424242;
    border: none;
    outline: none;
  }
  ${Link}.active {
    color: #EE0099;
  }
`;

const SettingsPage = () => {
  const [visible, setVisible] = useState('mailchimp');
  
  return (
    <CommunityForm omitButton>
      <Container fluid style={{ width: "100%", padding: "0" }}>
        <Row>
          <Col xl={12}>
            <Header.H3>Integrações</Header.H3>
            <Text>Conecte sua conta no BONDE a outras ferramentas para expandir seu impacto.</Text>
          </Col>
          <Col xl={12}>
            <MenuStyled>
              <Link component='button' type='button' onClick={() => setVisible('mailchimp')} className={visible === 'mailchimp' ? 'active' : ''}>Comunicação</Link>
              <Link component='button' type='button' onClick={() => setVisible('twilio')} className={visible === 'twilio' ? 'active' : ''}>Pressão</Link>
            </MenuStyled>
          </Col>
        </Row>
        <Row>
          {visible === 'mailchimp' && (
            <Col sm={12}>
              <Mailchimp />
            </Col>
          )}
          {visible === 'twilio' && (
            <Col sm={12}>
              <Twilio />
            </Col>
          )}
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
