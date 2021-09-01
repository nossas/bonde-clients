import React from 'react';
import {
  InputField,
  Heading,
  Text,
  Button,
  Tooltip,
  Success,
  Grid,
  GridItem,
  Flex,
  Stack,
  UnorderedList,
  ListItem
} from 'bonde-components';
import { useTranslation } from 'react-i18next';
import CommunityForm from '../BaseForm';
import MailchimpIcon from './MailchimpIcon';

const MailchimpPanel = () => {
  const { t } = useTranslation('community');
  
  return (
    <CommunityForm
      formName='Integrations'
      success={<Success message='Yeaa! Mailchimp conectado ao BONDE.' />}
    >
      {({ submitting, dirty }: any) => (
        <Grid templateColumns="repeat(12, 1fr)" gap={16}>
          <GridItem colSpan={[12, null, null, 1]} m="0 auto">
            <MailchimpIcon />
          </GridItem>
          <GridItem colSpan={[12, null, null, 7]}>
            <Stack spacing={4}>
              <Stack>
                <Heading as="h3" size="lg">Mailchimp</Heading>
                <Text>Conecte ao Mailchimp para se comunicar com as pessoas que agirem nas mobilizações da sua comunidade.</Text>
              </Stack>
              <Stack>
                <Heading as="h4" size="md">Pra começar</Heading>
                <Text>Crie ou acesse sua conta no <a href='https://login.mailchimp.com/signup/' title='Mailchimp' target='_blank' rel="noopener noreferrer">Mailchimp</a>.</Text>
              </Stack>
              <Stack>
                <InputField
                  name='community.mailchimp_api_key'
                  label={(
                    <Tooltip
                      label={t('integrations.form.fields.mailchimp_api_key.label')}
                      info={(
                        <>
                          <p><b>Onde encontro essa informação?</b></p>
                          <p>Faça login na sua conta no Mailchimp e <b>clique no seu nome</b> de usuário.</p>
                          <p>Você vai ver um menu surgir, clique na opção account.</p>
                          <p>{`Depois, siga os passos: `}<b>{`Extras > API keys > Your API keys > Create a Key`}</b></p>
                          <p>Agora é só <b>copiar o código</b> e colar aqui no campo.</p>
                        </>
                      )}
                    />
                  )}
                  placeholder={t('integrations.form.fields.mailchimp_api_key.placeholder')}
                />
                <InputField
                  name='community.mailchimp_list_id'
                  label={(
                    <Tooltip
                      label={t('integrations.form.fields.mailchimp_list_id.label')}
                      info={(
                        <>
                          <p><b>Onde encontro essa informação?</b></p>
                          <p>Faça login na sua conta no Mailchimp e <b>clique em Audience</b>.</p>
                          <p>Selecione a audiência correspondente e <b>clique em Settings</b>.</p>
                          <p>Agora é só <b>copiar o código</b> e colar aqui no campo.</p>
                        </>
                      )}
                    />
                  )}
                  placeholder={t('integrations.form.fields.mailchimp_list_id.placeholder')}
                />
                <Flex justifyContent="flex-end">
                  <Button type='submit' disabled={submitting || !dirty}>Conectar ao mailchimp</Button>
                </Flex>
              </Stack>
              <Stack>
                <Heading as="h4" size="md">Forçar sincronização</Heading>
                <Text>Sua base no Mailchimp não está atualizada? Tudo bem! Clique em sincronizar pra dar um empurrãozinho:</Text>
                <Flex justifyContent="flex-end">
                  <Button type='button'>Sincronizar</Button>
                </Flex>
              </Stack>
            </Stack>
          </GridItem>
          <GridItem colSpan={[12, null, null, 4]}>
            <Stack>
              <Heading as="h4" size="md">Funcionalidades</Heading>
              <UnorderedList>
                <ListItem>
                  <Text>Comunicação por e-mail com todas as pessoas que agirem nas páginas da sua comunidade.</Text>
                </ListItem>
                <ListItem>
                  <Text>Criação automática de segmentos estáticos no Mailchimp</Text>
                </ListItem>
                <ListItem>
                  <Text>Comunicação segmentada para reengajar membros da comunidade.</Text>
                </ListItem>
              </UnorderedList>
            </Stack>
            <Stack>
              <Heading as="h4" size="md">Dificuldade: Fácil</Heading>
              <UnorderedList>
                <ListItem>
                  <Text>Não precisa saber programar :)</Text>
                </ListItem>
                <ListItem>
                  <Text>Ferramenta em inglês.</Text>
                </ListItem>
                <ListItem>
                  <Text>Ferramenta paga.</Text>
                </ListItem>
              </UnorderedList>
            </Stack>
            <Stack>
              <Heading as="h4" size="md">Observações</Heading>
              <Text>Os segmentos criados pelo BONDE no Mailchimp seguem esse formato: M999P000, M999F000, M999D000 (M=Mobilização, P=Pressão, F=Formulário, D=Doação)</Text>
            </Stack>
          </GridItem>
        </Grid>
      )}
    </CommunityForm>
  );
}

export default MailchimpPanel;