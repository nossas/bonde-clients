import gql from 'graphql-tag';
import type { Filter, TargetGraphQL } from './types';
import { client as GraphQLAPI } from '.';

const asyncFilterTargetsGraphql = async ({ slug, custom_domain }: any) => {
  // dispatch({ type: 'FILTER_BLOCKS_REQUEST' });

  const filter: Filter = {};
  if (slug) filter.slug = { _eq: slug };
  if (custom_domain) filter.custom_domain = { _eq: custom_domain };

  return GraphQLAPI.query({
    query: gql`
      query ($filter: mobilizations_bool_exp!) {
        targets: pressure_targets(where: {
          widget: {
            block: {
              mobilization: $filter
            }}}, order_by: {label: asc}) {
              identify
              label
              targets
              email_subject
              email_body
              widget_id
              }}
    `,
    variables: { filter },
    fetchPolicy: "no-cache"
  })
    .then(({ data }: { data: { targets: TargetGraphQL[] } }) => {
      return Promise.resolve({ targets: data.targets });
    })
    .catch((err: any) => {
      console.log('failed', err);
      return Promise.reject(err);
    })
}

export default asyncFilterTargetsGraphql;
