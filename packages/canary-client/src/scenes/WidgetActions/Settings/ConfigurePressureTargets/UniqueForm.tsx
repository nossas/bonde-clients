import React from 'react';
import { Card, Header, Text } from 'bonde-components';
import SubjectBodyFields from './SubjectBodyFields';

export const UniqueFormExplainCard = () => (
  <Card padding={{ x: 50, y: 40 }}>
    <Header.H4 style={{ marginBottom: "10px" }}>
      Como adicionar alvos
    </Header.H4>
    <Text>Escreva nome e email de contato dos alvos segundo o formato abaixo.</Text>
    <Header.H4 style={{ marginBottom: "10px" }}>
      Formato do alvo
    </Header.H4>
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
  </Card>
)

const UniqueForm = () => (
  <SubjectBodyFields prefix='settings' />
);

export default UniqueForm;