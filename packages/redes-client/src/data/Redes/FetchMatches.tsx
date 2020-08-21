import React from "react";
import { useSession, useQuery, gql } from "bonde-core-tools";
import { Empty } from "../../components";

const MATCHES = gql`
  query RedeRelationships($context: Int_comparison_exp!) {
    relations: rede_relationships(
      where: { recipient: { group: { community_id: $context } } }
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
    groups: rede_groups(where: { community_id: $context }) {
      is_volunteer
      name
    }
  }
`;

const FetchMatches = (props: any) => {
  const { children, community } = props;

  const variables = { context: { _eq: community.id } };

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
