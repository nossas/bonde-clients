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
                <Text>Descrição turn.io</Text>
              </Stack>
              <Stack spacing={2}>
                <Heading as="h4" size="lg" >Pra começar</Heading>
                <Text>Crie ou acesse sua conta no <a href='https://login.turnio.com/signup/' title='Turn.io' target='_blank' rel="noopener noreferrer">Turn.io</a>.</Text>
              </Stack>
              <Stack>
                <Heading as="h4" size="lg">Integrar</Heading>
                <InputField
                  name='community.turnio_api_key'
                  label={t('integrations.form.fields.turnio_api_key.label')}
                  helpText={
                    <>
                      <p><b>Onde encontro essa informação?</b></p>
                      <p>Faça login na sua conta no Turn.io e <b>clique no seu nome</b> de usuário.</p>
                      <p>Você vai ver um menu surgir, clique na opção account.</p>
                      <p>Depois, siga os passos: <b>{`Extras > API keys > Your API keys > Create a Key`}</b></p>
                      <p>Agora é só <b>copiar o código</b> e colar aqui no campo.</p>
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
                    <Text>Descrição turn.io</Text>
                  </ListItem>
                  <ListItem>
                    <Text>Descrição turn.io</Text>
                  </ListItem>
                  <ListItem>
                    <Text>Comunicação segmentada para reengajar membros da comunidade.</Text>
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
                    <Text>Ferramenta em inglês.</Text>
                  </ListItem>
                  <ListItem>
                    <Text>Ferramenta paga.</Text>
                  </ListItem>
                </UnorderedList>
              </Stack>
              <Stack spacing={2}>
                <Heading as="h4" size="lg">Observações</Heading>
                <Text>Os segmentos criados pelo BONDE no Turn.io seguem esse formato: M999P000, M999F000, M999D000 (M=Mobilização, P=Pressão, F=Formulário, D=Doação)</Text>
              </Stack>
            </Stack>
          </GridItem>
        </Grid>
      )}
    </CommunityForm>
  );
}

export default TurnIoPanel;
