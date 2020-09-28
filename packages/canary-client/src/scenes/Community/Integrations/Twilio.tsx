import React from 'react';
import { useTranslation } from 'react-i18next';
import { InputField, Header, Text, Button } from 'bonde-components';
import { Container, Row, Col } from 'react-grid-system';
import Panel, { Section } from '../Panel';
import TwilioIcon from './TwilioIcon';

const TwilioPanel = () => {
  const { t } = useTranslation('community');

  return (
    <Panel>
      <Container fluid style={{ width: '100%', padding: '0' }}>
        <Row>
          <Col sm={2} style={{ textAlign: 'center' }}>
            <TwilioIcon />
          </Col>
          <Col sm={6}>
            <Section>
              <Header.H3>Twilio</Header.H3>
              <Text>Conecte ao Twilio para habilitar a ferramenta de pressão por telefone nas suas campanhas.</Text>
            </Section>
            <Section>
              <Header.H4>Pra começar</Header.H4>
              <Text>Cadastra-se no Twilio e crie um número de telefone.</Text>
            </Section>
            <Section>
              <Header.H4>Conectar</Header.H4>
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
              <Button type='submit'>Conectar ao Twilio</Button>
            </Section>
          </Col>
          <Col sm={4}>
            <Section>
              <Header.H4>Funcionalidades</Header.H4>
              <ul>
                <li>
                  <Text>Habilitar a pressão por telefone nas páginas da sua comunidade.</Text>
                </li>
                <li>
                  <Text>Enviar mensagens e fazer chamadas por telefone.</Text>
                </li>
              </ul>
            </Section>
            <Section>
              <Header.H4>Dificuldade: Fácil</Header.H4>
              <ul>
                <li>
                  <Text>Não precisa saber programar :)</Text>
                </li>
                <li>
                  <Text>Ferramenta em inglês.</Text>
                </li>
                <li>
                  <Text>Ferramenta paga, com versão gratuita para testar.</Text>
                </li>
              </ul>
            </Section>
          </Col>
        </Row>
      </Container>
    </Panel>
  )
}

export default TwilioPanel;