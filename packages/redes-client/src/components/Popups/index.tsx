import React, { useState } from "react";
import { Modal, Button, Loading } from "bonde-components";
import { useSession, useMutation } from "bonde-core-tools";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Default, Error } from ".";
import { useFilterDispatch } from "../../services/FilterProvider";
import { Individual } from "../../types";

const WrapLoading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 300px;
`;

const WrapButton = styled.div`
  & button {
    padding-left: 0;
  }
`;

const getVariables = (
  match: {
    recipient: Individual;
    volunteer: Individual;
  },
  userId: number,
  communityId?: number
) => {
  if (communityId === 40) {
    // make api calls to mapa graphql endpoint
    return {
      ...match,
    };
  }
  return {
    recipientId: match.recipient.id,
    volunteerId: match.volunteer.id,
    agentId: userId,
  };
};

export default function Popups({
  match,
  isOpen,
  setModal,
  CreateRelationship: CREATE_RELATIONSHIP,
}: {
  match: {
    recipient: Individual;
    volunteer: Individual;
  };
  setModal: (value: boolean) => void;
  isOpen: boolean;
  CreateRelationship: any;
}): React.ReactElement {
  const [createRelationship, { loading }] = useMutation(CREATE_RELATIONSHIP);
  const { user, community } = useSession();
  const dispatch = useFilterDispatch();
  const [error, setError] = useState<string | undefined>();
  const [data, setData] = useState();

  const handleClick = async () => {
    try {
      const { data } = await createRelationship({
        variables: getVariables(match, user.id, community?.id),
      });
      return setData(data);
    } catch (e) {
      e.graphQLErrors.map((error: any) => {
        console.log(error);
      });
      return setError(e.message);
    }
  };

  return (
    <Modal width={400} isOpen={isOpen} onClose={() => setModal(false)}>
      {isOpen && !error && !data && !loading && (
        <Default
          title="Confirma?"
          text={`${match.recipient.firstName} será encaminhada para ${match.volunteer.firstName}.`}
          MainBtn={<Button onClick={handleClick}>Confirmar</Button>}
          SecondaryBtn={
            <WrapButton>
              <Button align="left" onClick={() => setModal(false)} secondary>
                Voltar
              </Button>
            </WrapButton>
          }
        />
      )}
      {isOpen && loading && (
        <WrapLoading>
          <Loading />
        </WrapLoading>
      )}
      {isOpen && data && (
        <Default
          title="Eba!"
          text={`Uma relação foi criada entre ${match.recipient.firstName} e ${match.volunteer.firstName}.`}
          MainBtn={
            <a
              href={`https://api.whatsapp.com/send?phone=55${match.volunteer.phone}`}
              style={{ textDecoration: "none" }}
            >
              <Button>enviar whats para voluntária</Button>
            </a>
          }
          SecondaryBtn={
            <WrapButton>
              <Link
                to={"/matches"}
                onClick={() =>
                  dispatch({
                    type: "relationships",
                    value: {
                      query: `${match.volunteer.email}`,
                      agent: {
                        label: `${user.firstName} ${user.lastName || ""}`,
                        value: user.id,
                      },
                    },
                  })
                }
                style={{ textDecoration: "none" }}
              >
                <Button secondary>Ver relação</Button>
              </Link>
            </WrapButton>
          }
        />
      )}
      {isOpen && error && (
        <Error match={match} errorMsg={error} onSubmit={handleClick} />
      )}
    </Modal>
  );
}

export { default as Default } from "./Default";
export { default as Error } from "./Error";
