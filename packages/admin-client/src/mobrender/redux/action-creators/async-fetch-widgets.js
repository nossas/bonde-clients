import { GraphQLClient, gql } from 'graphql-request';
import { createAction } from './create-action'
import * as t from '../action-types'

const graphQLClient = new GraphQLClient(process.env.REACT_APP_DOMAIN_API_GRAPHQL || '', { credentials: 'include' });

export const FETCH_WIDGETS_QUERY = gql`
  query ($where: widgets_bool_exp) {
    widgets(where: $where) {
      id
      block_id
      kind
      settings
      sm_size
      md_size
      lg_size
      created_at
      updated_at
      exported_at
    }
  }
`
// Esses atributos pertenciam a API Rest, mas não sei se fazem sentido aqui
//
// {
//   "form_entries_count": 0,
//   "donations_count": 0,
//   "action_community": false,
//   "action_opportunity": false,
// }

export default mobilizationId => (dispatch, getState, { api }) => {
  dispatch(createAction(t.FETCH_WIDGETS_REQUEST))
  return graphQLClient.request(
    FETCH_WIDGETS_QUERY,
    { where: { block: { mobilization_id: { _eq: mobilizationId } } } }
  ).then(response => {
    dispatch(createAction(t.FETCH_WIDGETS_SUCCESS, response.widgets))
    return Promise.resolve(response.widgets)
  }).catch(ex => {
    dispatch(createAction(t.FETCH_WIDGETS_FAILURE, ex))
    return Promise.reject(ex)
  })
}