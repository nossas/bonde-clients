import React from "react";
import { Modal, Button } from "bonde-components";
import { useSession } from "bonde-core-tools";
import { Link } from "react-router-dom";
import { Default, Error } from ".";
import { useFilterDispatch } from "../../services/FilterProvider";
import { Individual } from "../../types";

const getVariables = (match: {
  recipient: Individual;
  volunteer: Individual;
}) => {
  const { user, community } = useSession();
  if (community?.id === 40) {
    // make api calls to mapa graphql endpoint
    return {
      ...match,
    };
  } else {
    return {
      recipientId: match.recipient.id,
      volunteerId: match.volunteer.id,
      agentId: user.id,
    };
  }
};

export default function Popups({
  match,
  isOpen,
  setModal,
  CreateRelationship,
}: {
  match: {
    recipient: Individual;
    volunteer: Individual;
  };
  setModal: (value: boolean) => void;
  isOpen: boolean;
  CreateRelationship: ({
    children,
  }: {
    children: (
      data: any,
      createRelationship: (value: any) => void
    ) => React.ReactElement;
  }) => React.ReactElement | null;
}): React.ReactElement {
  const { user } = useSession();
  const dispatch = useFilterDispatch();
  return (
    <CreateRelationship>
      {({ createRelationship, data, error }) => {
        return (
          <Modal isOpen={isOpen} onClose={() => setModal(false)}>
            {isOpen && (
              <Default
                title="Confirma?"
                text={`${match.recipient.firstName} será encaminhada para ${match.volunteer.firstName}.`}
                MainBtn={
                  <Button
                    onClick={() =>
                      createRelationship({
                        variables: getVariables(match),
                      })
                    }
                  >
                    Confirmar
                  </Button>
                }
                SecondaryBtn={
                  <Button onClick={() => setModal(false)} secondary>
                    Voltar
                  </Button>
                }
              />
            )}
            {data && (
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
                  <Link
                    to={"/matches"}
                    onClick={() =>
                      dispatch({
                        type: "relationships",
                        value: {
                          state: match.recipient.state,
                          agent: {
                            label: `${user.firstName} ${user.lastName || ""}`,
                            value: user.id,
                          },
                        },
                      })
                    }
                  >
                    <Button secondary>Ver relação</Button>
                  </Link>
                }
              />
            )}
            {error && (
              <Error
                match={match}
                errorMsg={error.msg}
                onSubmit={() =>
                  createRelationship({
                    variables: getVariables(match),
                  })
                }
              />
            )}
          </Modal>
        );
      }}
    </CreateRelationship>
  );
}

export { default as Default } from "./Default";
export { default as Error } from "./Error";
