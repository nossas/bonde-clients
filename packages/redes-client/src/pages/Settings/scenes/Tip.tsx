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
              <span style={{ fontWeight: 800 }}>VFIRSTNAME</span>: Primeiro nome
              ({group.name})
            </Text>
            <Text>
              <span style={{ fontWeight: 800 }}>VEMAIL</span>: Email (
              {group.name})
              <Text>
                <span style={{ fontWeight: 800 }}>VWHATSAPP</span>: Whatsapp (
                {group.name})
              </Text>
            </Text>
            <Text>
              <span style={{ fontWeight: 800 }}>VREGISTEROCCUPATION</span>: Nº
              de registro ({group.name})
            </Text>
          </>
        ) : (
          <>
            <Text>
              <span style={{ fontWeight: 800 }}>RFIRSTNAME</span>: Primeiro nome
              ({group.name})
            </Text>
            <Text>
              <span style={{ fontWeight: 800 }}>REMAIL</span>: Email (
              {group.name})
            </Text>
            <Text>
              <span style={{ fontWeight: 800 }}>RWHATSAPP</span>: Whatsapp (
              {group.name})
            </Text>
          </>
        );
      })}
      <Text>
        <span style={{ fontWeight: 800 }}>AGENT</span>: Pessoa que faz o match
      </Text>
    </Card>
  );
};

export default Tip;
