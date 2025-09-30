import React from 'react';
import { InputField, Success } from 'bonde-components';
import {
  Heading,
  Text,
  Button,
  Grid,
  GridItem,
  Flex,
  Stack,
  UnorderedList,
  ListItem
} from 'bonde-components/chakra';
import { useTranslation } from 'react-i18next';
import CommunityForm from '../BaseForm';
import TurnIoIcon from './TurnIoIcon';
import ForceSync from './ForceSync';

const TurnIoPanel: React.FC = () => {
  const { t } = useTranslation('community');

  return (
    <CommunityForm
      formName='Integrations'
      success={<Success message='Yeaa! Turn.io conectado ao BONDE.' />}
    >
      {({ submitting, dirty }: any) => (
        <Grid templateColumns="repeat(12, 1fr)" gap={16}>
          <GridItem colSpan={[12, null, null, 1]} m="0 auto">
            <TurnIoIcon />
          </GridItem>
          <GridItem colSpan={[12, null, null, 7]}>
            <Stack spacing={6}>
              <Stack spacing={2}>
                <Heading as="h3" size="xl">Turn.io</Heading>
                <Text>Conecte-se ao Turn.io para se comunicar com sua comunidade via WhatsApp, usando fluxos de mensagens personalizados e segmentação.</Text>
              </Stack>
              <Stack spacing={2}>
                <Heading as="h4" size="lg" >Pra começar</Heading>
                <Text>Crie ou acesse sua conta no <a href='https://login.turnio.com/signup/' title='Turn.io' target='_blank' rel="noopener noreferrer">Turn.io</a>.</Text>
              </Stack>
              <Stack>
                <Heading as="h4" size="lg">Integrar</Heading>
                <InputField
                  name='community.integrations.turnio.api_key'
                  label={t('integrations.form.fields.turnio_api_key.label')}
                  helpText={
                    <>
                      <p><b>Onde encontro essa informação?</b></p>
                      <p>Faça login na sua conta do Turn.io e <b>acesse o Settings,</b> para encontrar a chave da API</p>
                    </>
                  }
                  placeholder={t('integrations.form.fields.turnio_api_key.placeholder')}
                />
                <Flex justifyContent="flex-end">
                  <Button type='submit' disabled={submitting || !dirty} marginTop={4}>Conectar ao Turn.io</Button>
                </Flex>
              </Stack>
              <ForceSync />
            </Stack>
          </GridItem>
          <GridItem colSpan={[12, null, null, 4]}>
            <Stack spacing={6}>
              <Stack spacing={2}>
                <Heading as="h4" size="lg">Funcionalidades</Heading>
                <UnorderedList>
                  <ListItem>
                    <Text>Comunicação por WhatsApp com as pessoas da sua comunidade.</Text>
                  </ListItem>
                  <ListItem>
                    <Text>Segmentação de pessoas baseada nas ações feitas nas mobilizações do BONDE.</Text>
                  </ListItem>
                  <ListItem>
                    <Text>Criação de fluxos de mensagens personalizadas para engajar participantes.</Text>
                  </ListItem>
                  <ListItem>
                    <Text>Envio de mensagens em massa ou direcionadas para grupos específicos.</Text>
                  </ListItem>
                </UnorderedList>
              </Stack>
              <Stack spacing={2}>
                <Heading as="h4" size="lg">Dificuldade: Fácil</Heading>
                <UnorderedList>
                  <ListItem>
                    <Text>Não precisa saber programar :)</Text>
                  </ListItem>
                  <ListItem>
                    <Text>Integração feita copiando e colando a chave de API.</Text>
                  </ListItem>
                  <ListItem>
                    <Text>Ferramenta em inglês.</Text>
                  </ListItem>
                  <ListItem>
                    <Text>Ferramenta paga.</Text>
                  </ListItem>
                </UnorderedList>
              </Stack>
              <Stack spacing={2}>
                <Heading as="h4" size="lg">Observações</Heading>
                <Text>Necessário ter uma conta ativa no Turn.io para integrar.</Text>
                <Text>Para ativar a integração em uma campanha é necessário criar um campo customizado nas configurações de uma widget/tática vinculada à campanha.</Text>
              </Stack>
            </Stack>
          </GridItem>
        </Grid>
      )}
    </CommunityForm>
  );
}

export default TurnIoPanel;
