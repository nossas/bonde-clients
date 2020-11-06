import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components/macro";

import { Modal, Button, Loading, Icon } from "bonde-components";
import { useSession, useMutation } from "bonde-core-tools";

import { Default, Error } from ".";
import { useFilterDispatch } from "../../services/FilterProvider";
import {
  createCustomWhatsappLink,
  MAPA_DO_ACOLHIMENTO_COMMUNITY,
} from "../../services/utils";
import { Individual } from "../../types";

const WrapButton = styled.div`
  & button {
    padding-left: 0;
  }
`;

type MatchUsers = {
  input: {
    recipient_id: number;
    user_id?: number;
    volunteer_id: number;
    status: string;
  };
  recipientId: number;
  volunteerId: number;
}

const getVariables = (
  match: {
    recipient: Individual;
    volunteer: Individual;
  },
  user: any,
  communityId?: number
) => {
  if (communityId === MAPA_DO_ACOLHIMENTO_COMMUNITY) {
    // make api calls to mapa graphql endpoint
    return {
      ...match,
    };
  }
  const usersForMatch: MatchUsers = {
    input: {
      recipient_id: match.recipient.id,
      volunteer_id: match.volunteer.id,
      status: "encaminhamento_realizado"
    },
    recipientId: match.recipient.id,
    volunteerId: match.volunteer.id,
  }
  if(user.isAdmin) {
    usersForMatch.input["user_id"] = user.id
  }
  return usersForMatch
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
  const [customLink, setCustomLink] = useState({
    volunteer: "",
    recipient: "",
  });

  const handleClick = async () => {
    try {
      const { data } = await createRelationship({
        variables: getVariables(match, user, community?.id),
      });
      const customWhatsappLink = createCustomWhatsappLink(match, user.firstName);
      setCustomLink(customWhatsappLink);
      return setData(data);
    } catch (e) {
      e.graphQLErrors.map((error: any) => console.log(error));
      return setError(e.message);
    }
  };

  return (
    <Modal width="400px" isOpen={isOpen} onClose={() => setModal(false)}>
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
        <div
          css={css`
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 300px;
          `}
        >
          <Loading />
        </div>
      )}
      {isOpen && data && (
        <Default
          title="Eba!"
          text={`Uma relação foi criada entre ${match.recipient.firstName} e ${match.volunteer.firstName}.`}
          MainBtn={
            <div
              css={css`
                display: grid;
                grid-gap: 10px;
              `}
            >
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={customLink.volunteer}
                style={{ textDecoration: "none" }}
              >
                <Button>
                  <Icon name="Whatsapp" size="small" />
                  {match.volunteer.firstName}
                </Button>
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={customLink.recipient}
                style={{ textDecoration: "none" }}
              >
                <Button>
                  <Icon name="Whatsapp" size="small" />
                  {match.recipient.firstName}
                </Button>
              </a>
            </div>
          }
          SecondaryBtn={
            <WrapButton>
              <Link
                to={"/matches"}
                onClick={() =>
                  dispatch({
                    type: "relationships",
                    value: {
                      query: `${match.recipient.email}`,
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
