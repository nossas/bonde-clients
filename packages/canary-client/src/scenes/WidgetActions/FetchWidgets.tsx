import React from 'react';
import { gql, useQuery } from 'bonde-core-tools';
import { Hint } from 'bonde-components';

const widgetsByCommunityGQL = gql`
  query ($communityId: Int!) {
    widgets (
      where: {
        _and: [
          { kind: { _neq: "draft" }},
          { kind: { _neq: "content" }},
          {
            block: {
              mobilization: {
                deleted_at: { _is_null: true },
                community_id: { _eq: $communityId }
              }
            }
          }
        ]
      }
    ) {
      id
      kind
      block {
        mobilization {
          image: facebook_share_image
          name
          community_id
        }
      }
    }
  }
`

type Props = {
  communityId: number
  children: any
}

const FetchWidgets = ({ children, communityId }: Props) => {
  const { data, loading, error } = useQuery(widgetsByCommunityGQL, { variables: { communityId } });

  if (error) return <Hint color="error">{JSON.stringify(error)}</Hint>;
  if (loading) return 'Carregando widgets...';

  return children({ widgets: data.widgets });
}

export default FetchWidgets;