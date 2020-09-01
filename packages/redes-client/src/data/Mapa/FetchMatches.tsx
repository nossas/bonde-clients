import React from "react";
import styled from "styled-components";
import { useSession, useQuery, gql } from "bonde-core-tools";
import { Empty } from "bonde-components";
import { useFilterState } from "../../services/FilterProvider";
import {
  getSelectValues,
  getAgentZendeskUserId,
  deconstructAgent,
} from "../../services/utils";
import { MatchesData } from "../../types";

const WrapEmpty = styled.div`
  height: 100%;
  & > div {
    height: 100%;
  }
`;

const MATCHES = gql`
  query MapaRelationships(
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
        _and: [
          { status: { _neq: "solicitação_recebida" } }
          { status: { _neq: "solicitação_repetida" } }
          { status: $status }
          { recipient: { state: $state } }
          { recipient_ticket: { assignee_id: $agent } }
        ]
        _or: [
          { recipient: { name: { _ilike: $query } } }
          { recipient: { email: { _ilike: $query } } }
          { volunteer: { name: { _ilike: $query } } }
          { volunteer: { email: { _ilike: $query } } }
        ]
      }
    ) {
      id
      individualsTicketId: individuals_ticket_id
      volunteersTicketId: volunteers_ticket_id
      status
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
        _and: [
          { status: { _neq: "solicitação_recebida" } }
          { status: { _neq: "solicitação_repetida" } }
          { status: $status }
          { recipient: { state: $state } }
          { recipient_ticket: { assignee_id: $agent } }
        ]
      }
    ) {
      aggregate {
        count
      }
    }
  }
`;

const FetchMatches = (props: any) => {
  const { children, _community } = props;
  const { relationships, page: _, ...pagination } = useFilterState();

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
    ...pagination,
    // created_at: {
    //   _eq: created_at,
    // };
  };

  const { loading, error, data } = useQuery<MatchesData>(MATCHES, {
    variables,
  });

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log("error", error);
    return <p>Error</p>;
  }

  const groups = [
    {
      isVolunteer: true,
      name: "Voluntárias",
      communityId: 40,
    },
    {
      isVolunteer: false,
      name: "MSRs",
      communityId: 40,
    },
  ];

  const dataWithAgents = deconstructAgent(data);

  return children({
    ...dataWithAgents,
    relationshipsCount: data?.relationshipsCount.aggregate.count,
    groups,
  });
};

export default function CheckCommunity(props: any = {}): React.ReactElement {
  const { community } = useSession();
  return community ? (
    <FetchMatches community={community} {...props} />
  ) : (
    <WrapEmpty>
      <Empty message="Selecione uma comunidade" />
    </WrapEmpty>
  );
}

CheckCommunity.displayName = "CheckCommunityMatches";
