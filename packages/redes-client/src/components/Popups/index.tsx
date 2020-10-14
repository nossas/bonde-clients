import React from "react";
import { Modal, Button } from "bonde-components";
import { Link } from "react-router-dom";
import { Default, Error } from ".";
import { Individual } from "../../types";

export default function Popups({
  match,
  status,
  setStatus,
}: {
  match: {
    recipient: Individual;
    volunteer: Individual;
  };
  setStatus: (value?: any) => void;
  status?: string;
}): React.ReactElement {
  const sendRequest = async (e: string) => console.log(e);
  return (
    <Modal
      isOpen={typeof status !== "undefined"}
      onClose={() => setStatus(undefined)}
    >
      {status === "pending" && (
        <Default
          title="Confirma?"
          text={`${match.recipient.firstName} será encaminhada para ${match.volunteer.firstName}.`}
          MainBtn={
            <Button onClick={() => setStatus("rejected")}>Confirmar</Button>
          }
          SecondaryBtn={
            <Button onClick={() => setStatus(undefined)} secondary>
              Voltar
            </Button>
          }
        />
      )}
      {status === "success" && (
        <Default
          title="Eba!"
          text={`Uma relação foi criada entre ${match.recipient.firstName} e ${match.volunteer.firstName}.`}
          MainBtn={
            <a
              href={`https://api.whatsapp.com/send?phone=55${match.volunteer.phone}`}
            >
              <Button>enviar whats para voluntária</Button>
            </a>
          }
          SecondaryBtn={
            <Link to={"/matches"}>
              <Button secondary>Ver relação</Button>
            </Link>
          }
        />
      )}
      {status === "rejected" && (
        <Error
          match={match}
          errorMsg={"erro"}
          onSubmit={() => sendRequest("enviar novamente")}
        />
      )}
    </Modal>
  );
}

export { default as Default } from "./Default";
export { default as Error } from "./Error";
