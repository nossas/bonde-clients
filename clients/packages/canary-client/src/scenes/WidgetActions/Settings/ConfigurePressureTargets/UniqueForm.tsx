import React from 'react';
import { Heading, Text, Stack } from 'bonde-components';
import SubjectBodyFields from './SubjectBodyFields';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const UniqueFormExplainCard = () => (
  <Stack spacing={4}>
    <Stack spacing={2}>
      <Heading as="h4" size="sm">Como adicionar alvos</Heading>
      <Text>Escreva nome e email de contato dos alvos segundo o formato abaixo.</Text>
    </Stack>
    <Stack spacing={2}>
      <Heading as="h4" size="sm">Formato do alvo</Heading>
      <Text>
        {`Nome <email@provedor.com> (obrigatório usar os caractéres 
          < e >; para agrupar os alvos).`}
      </Text>
      <Text>
        {`Quando acabar, salve as alterações clicando no botão no canto 
        superior direito da tela.`}
      </Text>
      <Text>
        {`Os alvos serão exibidos em ordem aleatória na widget de pressão. 
        Ou seja, cada vez que a mobilização for acessada, a ordem de exibição 
        será diferente.`}
      </Text>
    </Stack>
  </Stack>
)

const UniqueForm = () => (
  <SubjectBodyFields prefix='settings' />
);

export default UniqueForm;