import React from "react";
import styled from "styled-components";
import { useSession, useQuery, gql } from "bonde-core-tools";
import { Empty } from "bonde-components";
import { useFilterState } from "../../services/FilterProvider";
import { getSelectValues } from "../../services/utils";

const WrapEmpty = styled.div`
  height: 100%;
  & > div {
    height: 100%;
  }
`;

const MATCHES = gql`
  query RedeRelationships(
    $context: Int_comparison_exp!
    $rows: Int!
    $offset: Int!
    $status: String_comparison_exp
    $state: String_comparison_exp
    $agent: Int_comparison_exp
    $order_by: [rede_relationships_order_by!]
    $query: String
  ) {
    relationships: rede_relationships(
      limit: $rows
      offset: $offset
      order_by: $order_by
      where: {
        recipient: { group: { community_id: $context }, state: $state }
        user_id: $agent
        status: $status
        _or: [
          { recipient: { first_name: { _ilike: $query } } }
          { recipient: { last_name: { _ilike: $query } } }
          { recipient: { email: { _ilike: $query } } }
          { volunteer: { first_name: { _ilike: $query } } }
          { volunteer: { last_name: { _ilike: $query } } }
          { volunteer: { email: { _ilike: $query } } }
        ]
      }
    ) {
      status
      is_archived
      comments
      metadata
      updatedAt: updated_at
      createdAt: created_at
      recipient {
        id
        firstName: first_name
        lastName: last_name
      }
      volunteer {
        id
        firstName: first_name
        lastName: last_name
        whatsapp
      }
      agent {
        id
        firstName: first_name
        lastName: last_name
      }
      id
    }
    relationshipsCount: rede_relationships_aggregate(
      where: {
        recipient: { group: { community_id: $context }, state: $state }
        user_id: $agent
        status: $status
        _or: [
          { recipient: { first_name: { _ilike: $query } } }
          { recipient: { last_name: { _ilike: $query } } }
          { recipient: { email: { _ilike: $query } } }
          { volunteer: { first_name: { _ilike: $query } } }
          { volunteer: { last_name: { _ilike: $query } } }
          { volunteer: { email: { _ilike: $query } } }
        ]
      }
    ) {
      aggregate {
        count
      }
    }
  }
`;

type Data = {
  relationships: Array<any>;
  groups: Array<{ is_volunteer: boolean; name: string; communityId: number }>;
  relationshipsCount: {
    aggregate: {
      count: number;
    };
  };
};

const FetchMatches = ({ children, community }: any) => {
  const { relationships, rows, offset } = useFilterState();

  const { relationshipStatus, state, agent, query } = getSelectValues(
    relationships
  );

  const variables = {
    context: { _eq: community && community.id },
    status: {
      _eq: relationshipStatus,
    },
    state: {
      _eq: typeof state === "string" ? state.toUpperCase() : state,
    },
    agent: {
      _eq: agent,
    },
    query: `%${query || ""}%`,
    rows,
    offset,
    // created_at: {
    //   _eq: created_at,
    // };
  };

  const { loading, error, data } = useQuery<Data>(MATCHES, { variables });

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log("error", error);
    return <p>Error</p>;
  }

  return children({
    ...data,
    relationshipsCount: data?.relationshipsCount.aggregate.count,
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
