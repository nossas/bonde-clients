import React from 'react';
import { Card, Header, Text } from 'bonde-components';
import SubjectBodyFields from './SubjectBodyFields';

export const UniqueFormExplainCard = () => (
  <Card padding={{ x: 50, y: 40 }}>
    <Header.H4 style={{ marginBottom: "10px" }}>
      Como adicionar alvos
      </Header.H4>
    <Text>
      {`Escreva um alvo em cada linha seguindo o formato abaixo, pressionando cmd+enter para ir pra linha seguinte.`}
      <br />
      <br />
      {`Formato do alvo: Nome <email@provedor.com> (obrigatório usar os caractéres < e > para agrupar os alvos).`}
      <br />
      <br />
      {`Quando acabar, salve as alterações clicando no botão no canto superior direito da tela.`}
      <br />
      <br />
      {`Os alvos serão exibidos em ordem aleatória na widget de pressão. Ou seja, cada vez que a mobilização for acessada, a ordem de exibição será diferente.`}
    </Text>
  </Card>
)

const UniqueForm = () => (
  <SubjectBodyFields />
);

export default UniqueForm;