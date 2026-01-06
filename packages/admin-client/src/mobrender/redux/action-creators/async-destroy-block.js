import { GraphQLClient, gql } from 'graphql-request';
import * as t from '../action-types';
import { createAction } from './create-action';

const graphQLClient = new GraphQLClient(process.env.REACT_APP_DOMAIN_API_GRAPHQL || '', { credentials: 'include' });

export const LOGIC_DELETE_BLOCK_MUTATION = gql`
mutation ($id: Int!) {
  update_blocks_by_pk(pk_columns: {id: $id}, _set: {deleted_at: "now()"}) {
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

export const LOGIC_DELETE_WIDGET_MUTATION = gql`
mutation ($block_id: Int!) {
  update_widgets(where: {block_id: {_eq: $block_id}}, _set: {deleted_at: "now!"}) {
    affected_rows
  }
}
`

export default (block) =>
  (dispatch, getState, { api }) => {
    dispatch(createAction(t.DESTROY_BLOCK_REQUEST));
    return graphQLClient.request(
      LOGIC_DELETE_BLOCK_MUTATION,
      { id: block.id }
    ).then((response) => {
      return graphQLClient.request(
        LOGIC_DELETE_WIDGET_MUTATION,
        { block_id: block.id }
      ).then(() => {
        dispatch(createAction(t.DESTROY_BLOCK_SUCCESS, response.update_blocks_by_pk));
        return Promise.resolve();
      });
    }).catch((ex) => {
      dispatch(createAction(t.DESTROY_BLOCK_FAILURE, ex));
      return Promise.reject(ex);
    });
  };
