import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  InputField,
  Header,
  Text,
  Button,
  Tooltip,
  Success,
  Grid,
  GridItem,
  Flex
} from 'bonde-components';
import CommunityForm from '../BaseForm';
import Panel, { Section } from '../../../components/Panel';
import TwilioIcon from './TwilioIcon';

const TwilioPanel = () => {
  const { t } = useTranslation('community');

  return (
    <CommunityForm
      formName='Integrations'
      success={<Success message='Uhuu! Twilio conectado ao BONDE.' />}
    >
      {({ submitting, dirty }: any) => (
        <Panel>
          <Grid templateColumns="repeat(12, 1fr)" gap={6}>
            <GridItem colSpan={[12, null, null, 1]} m="0 auto">
              <TwilioIcon />
            </GridItem>
            <GridItem colSpan={[12, null, null, 7]}>
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
                  label={(
                    <Tooltip
                      label={t('integrations.form.fields.twilio_account_sid.label')}
                      info={(
                        <>
                          <p><b>Onde encontro essa informação?</b></p>
                          <p>Faça login na sua conta no Twilio e acesse o <b>Dashboard</b>.</p>
                          <p>Logo abaixo de <b>Project Info</b> está o campo “ACCOUNT SID”.</p>
                          <p>Agora é só <b>copiar o código</b> e colar aqui no campo.</p>
                        </>
                      )}
                    />
                  )}
                  placeholder='Ex: ACe4________6835_______2277_______'
                />
                <InputField
                  name='community.twilio_auth_token'
                  label={(
                    <Tooltip
                      label={t('integrations.form.fields.twilio_auth_token.label')}
                      info={(
                        <>
                          <p><b>Onde encontro essa informação?</b></p>
                          <p>Faça login na sua conta no Twilio e acesse o <b>Dashboard</b>.</p>
                          <p>Logo abaixo de <b>Project Info</b> está o campo “AUTH TOKEN”.</p>
                          <p>Agora é só <b>copiar o código</b> e colar aqui no campo.</p>
                        </>
                      )}
                    />
                  )}
                  placeholder='Ex: ecd5_______a82c_______b9c9______'
                />
                <InputField
                  name='community.twilio_number'
                  label={(
                    <Tooltip
                      label={t('integrations.form.fields.twilio_number.label')}
                      info={(
                        <>
                          <p><b>Onde encontro essa informação?</b></p>
                          <p>Faça login na sua conta no Twilio e acesse o <b>Dashboard</b>.</p>
                          <p>Logo abaixo de <b>Project Info</b> está o campo “TRIAL NUMBER”.</p>
                          <p>Agora é só <b>copiar o código</b> e colar aqui no campo.</p>
                        </>
                      )}
                    />
                  )}
                  placeholder='Ex: +5511956781234'
                />
                <Flex justifyContent="flex-end">
                  <Button type='submit' disabled={submitting || !dirty}>Conectar ao Twilio</Button>
                </Flex>
              </Section>
            </GridItem>
            <GridItem colSpan={[12, null, null, 4]}>
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
            </GridItem>
          </Grid>
        </Panel>
      )}
    </CommunityForm>
  )
}

export default TwilioPanel;