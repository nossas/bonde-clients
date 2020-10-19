import React from "react";
import { gql, useMutation } from "bonde-core-tools";
import { Loading } from "bonde-components";
import styled from "styled-components";
import { CheckCommunity } from "../../components";

const WrapLoading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const CREATE_RELATIONSHIP = gql`
  mutation createRelationship(
    $recipientId: Int!
    $volunteerId: Int!
    $agentId: Int!
  ) {
    insert_rede_relationships(
      objects: {
        recipient_id: $recipientId
        volunteer_id: $volunteerId
        status: "encaminhamento_realizado"
        user_id: $agentId
      }
    ) {
      returning {
        created_at
        id
        recipient_id
        updated_at
        agent {
          id
        }
      }
    }

    update_rede_individuals(
      _set: { availability: "indisponível" }
      where: {
        _or: [{ id: { _eq: $volunteerId } }, { id: { _eq: $recipientId } }]
      }
    ) {
      returning {
        id
        email
        availability
      }
    }
  }
`;

type Props = {
  children: any;
};

const CreateRelationship = ({ children }: Props) => {
  const [createRelationship, { data, loading, error }] = useMutation(
    CREATE_RELATIONSHIP
  );

  if (loading)
    return (
      <WrapLoading>
        <Loading />
      </WrapLoading>
    );

  return children({
    createRelationship,
    data,
    error,
  });
};

CreateRelationship.displayName = "CreateRelationship";

// eslint-disable-next-line react/display-name
export default function (props: any = {}): React.ReactElement {
  return <CheckCommunity Component={CreateRelationship} {...props} />;
}
