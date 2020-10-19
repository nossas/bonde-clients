import React from "react";
import { gql } from "bonde-core-tools";
import { CheckCommunity, FetchDataFromGraphql } from "../../components";
import { useFilterState } from "../../services/FilterProvider";
import { getSelectValues, getAgentZendeskUserId } from "../../services/utils";

const MATCHES = gql`
  query Relationships(
    $rows: Int!
    $offset: Int!
    $status: String_comparison_exp
    $state: String_comparison_exp
    $agent: bigint_comparison_exp
    $query: String
    $order_by: [solidarity_matches_order_by!]
    $created_at: timestamp_comparison_exp
  ) {
    relationships: solidarity_matches(
      limit: $rows
      offset: $offset
      order_by: $order_by
      where: {
        created_at: $created_at
        status: $status
        recipient: { state: $state }
        recipient_ticket: { assignee_id: $agent }
        _or: [
          { recipient: { name: { _ilike: $query }, email: { _ilike: $query } } }
          { volunteer: { name: { _ilike: $query }, email: { _ilike: $query } } }
        ]
      }
    ) {
      id
      individualsTicketId: individuals_ticket_id
      volunteersTicketId: volunteers_ticket_id
      relationshipStatus: status
      createdAt: created_at
      recipientTicket: recipient_ticket {
        agentId: assignee_id
      }
      volunteer {
        firstName: name
        organizationId: organization_id
        id: user_id
        state
        phone
        whatsapp
      }
      recipient {
        firstName: name
        organizationId: organization_id
        id: user_id
        state
        phone
        whatsapp
      }
    }
    relationshipsCount: solidarity_matches_aggregate(
      where: {
        created_at: $created_at
        status: $status
        recipient: { state: $state }
        recipient_ticket: { assignee_id: $agent }
        _or: [
          { recipient: { name: { _ilike: $query }, email: { _ilike: $query } } }
          { volunteer: { name: { _ilike: $query }, email: { _ilike: $query } } }
        ]
      }
    ) {
      aggregate {
        count
      }
    }
  }
`;

const FetchMatches = (props: any = {}) => {
  const { relationships, rows, offset } = useFilterState();

  const { relationshipStatus, state, query, agent } = getSelectValues(
    relationships
  );

  const variables = {
    status: {
      _eq: relationshipStatus,
    },
    state: {
      _eq: typeof state === "string" ? state.toUpperCase() : state,
    },
    agent: {
      _eq: getAgentZendeskUserId(agent as number | null),
    },
    query: `%${query || ""}%`,
    rows,
    offset,
    // created_at: {
    //   _eq: created_at,
    // };
  };

  return (
    <FetchDataFromGraphql variables={variables} query={MATCHES} {...props} />
  );
};

FetchMatches.displayName = "FetchMatches";

// eslint-disable-next-line react/display-name
export default function (props: any = {}): React.ReactElement {
  return <CheckCommunity Component={FetchMatches} {...props} />;
}
