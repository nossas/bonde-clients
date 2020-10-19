import React from "react";
import { gql, useMutation } from "bonde-core-tools";
import { CheckCommunity } from "../../components";
// import {
//   createVolunteerTicket,
//   updateRecipientTicket,
// } from "../../services/Zendesk";
// import { Individual } from "../../types";

import styled from "styled-components";
import { Loading } from "bonde-components";

const WrapLoading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const CREATE_RELATIONSHIP = gql`
  mutation createRelationship(
    $tickets: [solidarity_tickets_insert_input!]!
    $match: solidarity_matches_insert_input!
  ) {
    insert_solidarity_tickets(
      objects: $tickets
      on_conflict: {
        constraint: solidarity_tickets_ticket_id_key
        update_columns: [
          status
          assignee_id
          custom_fields
          tags
          updated_at
          link_match
          data_encaminhamento
          nome_voluntaria
          status_acolhimento
          match_syncronized
        ]
      }
    ) {
      returning {
        ticket_id
      }
    }
    insert_solidarity_matches_one(
      object: $match
      on_conflict: {
        constraint: solidarity_matches_individuals_ticket_id_volunteers_ticket__key
        update_columns: [
          created_at
          community_id
          individuals_user_id
          volunteers_user_id
          volunteers_ticket_id
          status
        ]
      }
    ) {
      id
    }
  }
`;

type Props = {
  children: any;
};

const CreateRelationship = ({
  // individuals,
  children,
}: Props) => {
  // const volunteerTicket = await createVolunteerTicket(individuals);
  // const recipientTicket = await updateRecipientTicket(individuals);

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
    // volunteerTicket,
    // recipientTicket
  });
};

CreateRelationship.displayName = "CreateRelationship";

// eslint-disable-next-line react/display-name
export default function (props: any = {}): React.ReactElement {
  return <CheckCommunity Component={CreateRelationship} {...props} />;
}
