import React from 'react';
import { gql, useQuery } from 'bonde-core-tools';
import { Hint, Loading } from 'bonde-components';
import { css } from 'styled-components/macro';

const widgetsByCommunityGQL = gql`
  query FetchWidgets ($communityId: Int!) {
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
      settings
      block {
        mobilization {
          image: facebook_share_image
          name
          community_id
        }
      }
      groups: pressure_targets {
        id
        targets
        identify
        label
        email_subject
        email_body
      }

      actions: activist_actions_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`

export type Widget = {
  id: number
  kind: 'pressure' | 'form' | 'donation'
  block: {
    mobilization: {
      image?: string
      name: string
      community_id: number
    }
  }
  groups: {
    id: number
    targets: string[]
    identify: string
    label: string
    email_subject?: string
    email_body?: string
  }[]
  actions: {
    aggregate: {
      count: number
    }
  }
  settings: Record<string, any>
}

export type RenderProps = {
  widgets: Widget[]
  loading: boolean
  refetch: any
}

export const WidgetLoading = () => (
  <div
    css={css`
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        `}
  >
    <Loading message='Carregando ações...' />
  </div>
)


type Props = {
  communityId: number
  children: ({ widgets }: RenderProps) => any
}

const FetchWidgets = ({ children, communityId }: Props) => {
  const { data, loading, error, refetch } = useQuery<RenderProps>(widgetsByCommunityGQL, { variables: { communityId } });

  if (error) return <Hint color="error">{JSON.stringify(error)}</Hint>;

  return children({ widgets: data?.widgets || [], refetch, loading });
}

export default FetchWidgets;