import React from "react";
import { Header, Text, Button } from "bonde-components";
import { Individual } from "../../types";

export default function Error({
  match,
  onSubmit,
  errorMsg,
}: {
  match: {
    recipient: Individual;
    volunteer: Individual;
  };
  onSubmit: () => void;
  errorMsg: string;
}): React.ReactElement {
  return (
    <div>
      <Header.H2>Ops!</Header.H2>
      <Text align="center">
        Encontramos um erro e {match.recipient.firstName} não pôde ser
        encaminhada para {match.volunteer.firstName}
      </Text>
      <div
        style={{
          backgroundColor: "#EEEEEE",
          padding: "15px 20px",
        }}
      >
        <Text>{errorMsg}</Text>
      </div>
      <Text align="center">
        Clique abaixo para tentar outra vez. Se o erro persistir, comunique a
        equipe de tecnologia.
      </Text>
      <Button onClick={onSubmit}>tentar novamente</Button>
    </div>
  );
}
