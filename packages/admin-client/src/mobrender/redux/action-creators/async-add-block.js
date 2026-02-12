import { GraphQLClient, gql } from 'graphql-request';
import * as t from '../action-types';
import { createAction } from './create-action';

import MobSelectors from '../selectors';

const graphQLClient = new GraphQLClient(process.env.REACT_APP_DOMAIN_API_GRAPHQL || '', { credentials: 'include' });

export const ADD_BLOCK_MUTATION = gql`
mutation ($block: blocks_insert_input!) {
  insert_blocks_one(object: $block) {
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

    widgets {
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
}
`

export default ({ widgets_attributes, ...blockAttrs }) => (dispatch, getState, { api }) => {
  const lastPosition = MobSelectors(getState()).getBlockLastPosition()
  const block = {
    ...blockAttrs,
    widgets: {
      data: widgets_attributes
    },
    position: lastPosition + 1
  }

  dispatch(createAction(t.ADD_BLOCK_REQUEST))
  return graphQLClient.request(
    ADD_BLOCK_MUTATION,
    { block }
  ).then(response => {
    const { widgets, ...block } = response.insert_blocks_one;
    dispatch(createAction(t.ADD_BLOCK_SUCCESS, block))
    widgets.forEach((widget) => {
      console.log("widget", widget);
      dispatch(createAction(t.ADD_WIDGETS_SUCCESS, widget))
    })
    return Promise.resolve(response.insert_blocks_one)
  }).catch(ex => {
    dispatch(createAction(t.ADD_BLOCK_FAILURE, ex))
    return Promise.reject(ex)
  });
}
