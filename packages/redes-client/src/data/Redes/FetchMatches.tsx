import React from "react";
import { useSession, useQuery, gql } from "bonde-core-tools";
import { Empty } from "../../components";
import { useFilterState } from "../../utils/FilterProvider";

const MATCHES = gql`
  query RedeRelationships(
    $context: Int_comparison_exp!
    $rows: Int!
    $offset: Int!
    $status: String_comparison_exp
    $availability: String_comparison_exp
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
        agent: { id: $agent }
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
  }
`;

const FetchMatches = (props: any) => {
  const { children, community } = props;
  const state = useFilterState();
  const { page: _, ...filters } = state;

  const variables = {
    context: { _eq: community && community.id },
    order_by: filters.order_by || { created_at: "desc" },
    ...filters,
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
