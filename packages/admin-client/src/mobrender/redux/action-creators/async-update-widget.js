import { GraphQLClient, gql } from 'graphql-request';
import { createAction } from './create-action'
import * as t from '../action-types'

const graphQLClient = new GraphQLClient(process.env.REACT_APP_DOMAIN_API_GRAPHQL || '', { credentials: 'include' });

export const UPDATE_WIDGET_MUTATION = gql`
mutation ($widget: widgets_set_input!, $id: Int!) {
  update_widgets_by_pk(pk_columns: {id: $id}, _set: $widget) {
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

export default ({ id, redirect, ...widget }) => (dispatch, getState, { api }) => {
  dispatch(createAction(t.UPDATE_WIDGET_REQUEST))

  return graphQLClient.request(
    UPDATE_WIDGET_MUTATION, { id, widget }
  ).then(response => {
    dispatch(createAction(t.UPDATE_WIDGET_SUCCESS, response.update_widgets_by_pk))
    return Promise.resolve(response.update_widgets_by_pk)
  }).catch(ex => {
    dispatch(createAction(t.UPDATE_WIDGET_FAILURE, ex))
    return Promise.reject(ex)
  });
}
