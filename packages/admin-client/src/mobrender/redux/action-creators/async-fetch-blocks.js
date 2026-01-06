import { GraphQLClient, gql } from 'graphql-request';
import * as t from '../action-types'
import { createAction } from './create-action'

const graphQLClient = new GraphQLClient(process.env.REACT_APP_DOMAIN_API_GRAPHQL || '', { credentials: 'include' });

export const FETCH_BLOCKS_QUERY = gql`
  query ($where: blocks_bool_exp) {
    blocks(where: $where, order_by: {position: asc}) {
      id
      mobilization_id
      created_at
      updated_at
      bg_class
      position
      hidden
      bg_image
      name
      menu_hidden
      deleted_at
    }
  }
`

export default mobilizationId => (dispatch, getState, { api }) => {
  dispatch(createAction(t.FETCH_BLOCKS_REQUEST))
  return graphQLClient.request(
    FETCH_BLOCKS_QUERY,
    { where: { mobilization_id: { _eq: mobilizationId }, deleted_at: { _is_null: true } } }
  ).then(response => {
    dispatch(createAction(t.FETCH_BLOCKS_SUCCESS, response.blocks))
    return Promise.resolve(response.blocks)
  }).catch(ex => {
    dispatch(createAction(t.FETCH_BLOCKS_FAILURE, ex))
    return Promise.reject(ex)
  })
}