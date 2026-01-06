import { GraphQLClient, gql } from 'graphql-request';
import { createAction } from './create-action'
import * as t from '../action-types'

import AuthSelectors from '../../../account/redux/selectors'
import Selectors from '../selectors'

const graphQLClient = new GraphQLClient(process.env.REACT_APP_DOMAIN_API_GRAPHQL || '', { credentials: 'include' });

export const UPDATE_BLOCK_MUTATION = gql`
mutation ($block: blocks_set_input!, $id: Int!) {
  update_blocks_by_pk(pk_columns: {id: $id}, _set: $block) {
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

export default ({ id, offsetTop, scrollTopReached, ...block }) => (dispatch, getState, { api }) => {
  dispatch(createAction(t.UPDATE_BLOCK_REQUEST))

  return graphQLClient.request(
    UPDATE_BLOCK_MUTATION, { id, block }
  ).then(response => {
    dispatch(createAction(t.UPDATE_BLOCK_SUCCESS, response.update_blocks_by_pk))
    return Promise.resolve(response.update_blocks_by_pk)
  }).catch(ex => {
    dispatch(createAction(t.UPDATE_BLOCK_FAILURE, ex))
    return Promise.reject(ex)
  });
}
