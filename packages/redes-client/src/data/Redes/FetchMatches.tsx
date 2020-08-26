import React from "react";
import { useSession, useQuery, gql } from "bonde-core-tools";
import { Empty } from "../../components";
import { useFilterState } from "../../services/FilterProvider";
import { getSelectValues } from "../../services/utils";

const MATCHES = gql`
  query RedeRelationships(
    $context: Int_comparison_exp!
    $rows: Int!
    $offset: Int!
    $status: String_comparison_exp
    $state: String_comparison_exp
    $agent: Int_comparison_exp
    $order_by: [rede_relationships_order_by!]
  ) {
    relationships: rede_relationships(
      limit: $rows
      offset: $offset
      order_by: $order_by
      where: {
        recipient: { group: { community_id: $context }, state: $state }
        user_id: $agent
        status: $status
      }
    ) {
      status
      is_archived
      comments
      metadata
      updated_at
      created_at
      recipient {
        id
        first_name
        last_name
      }
      volunteer {
        id
        first_name
        last_name
      }
      agent {
        id
        first_name
        last_name
      }
      id
    }
    relationships_count: rede_relationships_aggregate(
      where: { recipient: { group: { community_id: $context } } }
    ) {
      aggregate {
        count
      }
    }
    groups: rede_groups(where: { community_id: $context }) {
      is_volunteer
      name
    }
    agents: communities(where: { id: $context }) {
      community_users {
        user {
          first_name
          last_name
          id
        }
      }
    }
  }
`;

const FetchMatches = (props: any) => {
  const { children, community } = props;
  const { relationships, page: _, ...pagination } = useFilterState();

  const { relationshipStatus, state, agent } = getSelectValues(relationships);

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
    ...pagination,
    // created_at: {
    //   _eq: created_at,
    // };
    // agent: {
    //   _eq: agent,
    // },
  };

  const { loading, error, data } = useQuery(MATCHES, { variables });

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log("error", error);
    return <p>Error</p>;
  }
  return children(data);
};

export default (props: any = {}) => {
  const { community } = useSession();
  return community ? (
    <FetchMatches community={community} {...props} />
  ) : (
    <Empty message="Selecione uma comunidade" />
  );
};
