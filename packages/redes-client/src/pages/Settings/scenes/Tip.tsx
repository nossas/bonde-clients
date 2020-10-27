import React from "react";
import { Text, Header, Card } from "bonde-components";
import { Groups } from "../../../types";

const Tip = ({ groups }: { groups: Groups }): React.ReactElement => {
  return (
    <Card rounded={"5px"} padding={{ x: 20, y: 30 }}>
      <Header.H3>Dica</Header.H3>
      <div style={{ marginTop: 15, marginBottom: 10 }}>
        <Text>
          Pra usar dados das pessoas diretamente na mensagem, use as variáveis
          abaixo:
        </Text>
      </div>
      {groups.map((group) => {
        return group.isVolunteer ? (
          <>
            <Text>
              <span style={{ fontWeight: 800 }}>NOME_VOLUNTARIA</span>: Primeiro
              nome ({group.name})
            </Text>
            <Text>
              <span style={{ fontWeight: 800 }}>EMAIL_VOLUNTARIA</span>: Email (
              {group.name})
              <Text>
                <span style={{ fontWeight: 800 }}>WHATSAPP_VOLUNTARIA</span>:
                Whatsapp ({group.name})
              </Text>
            </Text>
            <Text>
              <span style={{ fontWeight: 800 }}>REGISTRO_VOLUNTARIA</span>: Nº
              de registro ({group.name})
            </Text>
          </>
        ) : (
          <>
            <Text>
              <span style={{ fontWeight: 800 }}>NOME_PSR</span>: Primeiro nome (
              {group.name})
            </Text>
            <Text>
              <span style={{ fontWeight: 800 }}>EMAIL_PSR</span>: Email (
              {group.name})
            </Text>
            <Text>
              <span style={{ fontWeight: 800 }}>WHATSAPP_PSR</span>: Whatsapp (
              {group.name})
            </Text>
          </>
        );
      })}
      <Text>
        <span style={{ fontWeight: 800 }}>AGENTE</span>: Pessoa que faz o match
      </Text>
    </Card>
  );
};

export default Tip;
