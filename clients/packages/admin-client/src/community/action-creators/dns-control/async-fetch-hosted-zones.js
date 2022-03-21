import { GraphQLClient, gql } from 'graphql-request';
import * as t from '../../action-types'
import { createAction } from '../create-action'
import * as CommunitySelectors from '../../selectors'

const DNS_HOSTED_ZONES_QUERY = gql`
  query ($community_id: Int!) {
    dns_hosted_zones(where: { community_id: { _eq: $community_id }, ns_ok: { _eq: true } }) {
      domain_name
      status
      ns_ok
      hosted_zone: response(path: "hosted_zone")
      delegation_set: response(path: "delegation_set")
    }
  }
`;

const graphQLClient = new GraphQLClient(process.env.REACT_APP_DOMAIN_API_GRAPHQL, { credentials: 'include' })

export default () => (dispatch, getState) => {
  const community = CommunitySelectors.getCurrent(getState())

  dispatch(createAction(t.FETCH_DNS_HOSTED_ZONES_REQUEST))
  return graphQLClient.request(
    DNS_HOSTED_ZONES_QUERY,
    { community_id: community.id }
  ).then((data) => {
    dispatch(createAction(t.FETCH_DNS_HOSTED_ZONES_SUCCESS, data.dns_hosted_zones));
    return Promise.resolve(data.dns_hosted_zones);
  }).catch((err) => {
    console.log('err', err);
    dispatch(createAction(t.FETCH_DNS_HOSTED_ZONES_FAILURE, err));
    return Promise.reject(err);
  });
}
