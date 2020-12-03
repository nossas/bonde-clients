import React from "react";
import { useQuery, gql } from "bonde-core-tools";
import { Hint } from "bonde-components";

const communityWidgets = gql`
  query($communityId: Int!) {
    mobilizations(
      where: { community_id: { _eq: $communityId }, status: { _eq: "active" } }
    ) {
      id
      name
      blocks(where: { hidden: { _eq: false } }) {
        id
        widgets(
          where: {
            _and: [{ kind: { _neq: "content" } }, { kind: { _neq: "draft" } }]
          }
        ) {
          id
          kind
        }
      }
    }
  }
`;

type Props = {
  communityId: number;
  children: any;
};

type CommunityWidgetsData = {
  mobilizations: Array<{
    id: number;
    name: string;
    blocks: Array<{
      id: number;
      widgets: Array<{
        id: number;
        kind: string;
      }>;
    }>;
  }>;
};

const CommunityWidgets = ({ communityId, children }: Props) => {
  const { data, loading, error } = useQuery<CommunityWidgetsData>(
    communityWidgets,
    {
      variables: { communityId },
    }
  );

  if (error) {
    console.log("error", { error });
    return <Hint color="error">{JSON.stringify(error)}</Hint>;
  }

  if (loading) return "Carregando...";

  const filteredData =
    data &&
    data.mobilizations.filter((mobilization) => {
      const blockWidgets = mobilization.blocks.filter(
        (block) => block.widgets.length > 0
      );
      return blockWidgets.length > 0;
    });

  return children({ mobilizations: filteredData });
};

export default CommunityWidgets;
