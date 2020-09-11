import React from 'react';
import { InputField, Header, Text, Button } from 'bonde-components';
import { Container, Row, Col } from 'react-grid-system';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import Panel from '../Panel';
import MailchimpIcon from './MailchimpIcon';

const Section = styled.div`
  padding: 0 0 20px;

  ${Header.h4}, ${Header.h3} {
    padding-bottom: 12px;
  }

  button {
    margin: 12px 0 0;
  }

  ul {
    margin: 0 1em 0;
  }
`

const MailchimpPanel = () => {
  const { t } = useTranslation('community');
  
  return (
    <Panel>
      <Container fluid style={{ width: '100%', padding: '0' }}>
        <Row>
          <Col sm={2} style={{ textAlign: 'center' }}>
            <MailchimpIcon />
          </Col>
          <Col sm={6}>
            <Section>
              <Header.h3>Mailchimp</Header.h3>
              <Text>Conecte ao Mailchimp para se comunicar com as pessoas que agirem nas mobilizações da sua comunidade.</Text>
            </Section>
            <Section>
              <Header.h4>Pra começar</Header.h4>
              <Text>Crie ou acesse sua conta no <a href='https://login.mailchimp.com/signup/' title='Mailchimp' target='_blank' rel="noopener noreferrer">Mailchimp</a>.</Text>
            </Section>
            <Section>
              <Header.h4>Integrar</Header.h4>
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
              <Button type='submit'>Conectar ao mailchimp</Button>
            </Section>
            <Section>
              <Header.h4>Forçar sincronização</Header.h4>
              <Text>Sua base no Mailchimp não está atualizada? Tudo bem! Clique em sincronizar pra dar um empurrãozinho:</Text>
              <Button type='button' dark>Sincronizar</Button>
            </Section>
          </Col>
          <Col sm={4}>
            <Section>
              <Header.h4>Funcionalidades</Header.h4>
              <ul>
                <li>
                  <Text>Comunicação por e-mail com todas as pessoas que agirem nas páginas da sua comunidade.</Text>
                </li>
                <li>
                  <Text>Criação automática de segmentos estáticos no Mailchimp</Text>
                </li>
                <li>
                  <Text>Comunicação segmentada para reengajar membros da comunidade.</Text>
                </li>
              </ul>
            </Section>
            <Section>
              <Header.h4>Dificuldade: Fácil</Header.h4>
              <ul>
                <li>
                  <Text>Não precisa saber programar :)</Text>
                </li>
                <li>
                  <Text>Ferramenta em inglês.</Text>
                </li>
                <li>
                  <Text>Ferramenta paga.</Text>
                </li>
              </ul>
            </Section>
            <Section>
              <Header.h4>Dificuldade: Fácil</Header.h4>
              <Text>Os segmentos criados pelo BONDE no Mailchimp seguem esse formato: M999P000, M999F000, M999D000 (M=Mobilização, P=Pressão, F=Formulário, D=Doação)</Text>
            </Section>
          </Col>
        </Row>
      </Container>
    </Panel>
  );
}

export default MailchimpPanel;