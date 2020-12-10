import React from "react";
import {
  Card,
  Header,
  Text,
  ConnectedForm,
  InputField,
  TextareaField,
} from "bonde-components";

const SimpleTargetsForm = (): React.ReactElement => {
  return (
    <>
      <Card padding={{ x: 40, y: 30 }}>
        <Header.H4>Definir alvos</Header.H4>
        <ConnectedForm onSubmit={(e) => console.log(e)}>
          {({ submitting: _ }: any) => (
            <>
              <InputField
                name="subject"
                placeholder="Escreva um assunto"
                label="ASSUNTO DO EMAIL PARA OS ALVOS"
              />
              <TextareaField
                name="body"
                placeholder="Escreva aqui o email..."
                label="CORPO DO EMAIL PARA OS ALVOS"
              />
            </>
          )}
        </ConnectedForm>
      </Card>
      <Card padding={{ x: 50, y: 40 }}>
        <Header.H4>Como adicionar alvos</Header.H4>
        <Text>
          {`Escreva um alvo em cada linha seguindo o formato abaixo, pressionando cmd+enter para ir pra linha seguinte.`}
          {`Formato do alvo: Nome <email@provedor.com> (obrigatório usar os caractéres < e > para agrupar os alvos).`}
          {`Quando acabar, salve as alterações clicando no botão no canto superior direito da tela.`}
          {`Os alvos serão exibidos em ordem aleatória na widget de pressão. Ou seja, cada vez que a mobilização for acessada, a ordem de exibição será diferente.`}
        </Text>
      </Card>
    </>
  );
};

export default SimpleTargetsForm;
