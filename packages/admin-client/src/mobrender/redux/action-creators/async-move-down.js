import { GraphQLClient, gql } from 'graphql-request';
import * as t from '../action-types'
import { createAction } from './create-action'

import Selectors from '../selectors'

const graphQLClient = new GraphQLClient(process.env.REACT_APP_DOMAIN_API_GRAPHQL || '', { credentials: 'include' });

export const UPDATE_BLOCK_MANY_MUTATION = gql`
mutation ($blocks: [blocks_updates!]!) {
  update_blocks_many(updates: $blocks) {
    returning {
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
}
`
export default block => (dispatch, getState, { api }) => {
  const blocks = Selectors(getState()).getBlocks();

  const nextBlock = blocks[blocks.indexOf(blocks.filter(b => b.id === block.id)[0]) + 1];

  const updatedBlocks = [
    // next
    {
      where: { id: { _eq: nextBlock.id } },
      _set: { position: block.position }
    },
    // current
    {
      where: { id: { _eq: block.id } },
      _set: { position: nextBlock.position }
    }
  ];

  dispatch(createAction(t.UPDATE_BLOCK_REQUEST));

  return graphQLClient.request(
    UPDATE_BLOCK_MANY_MUTATION,
    { blocks: updatedBlocks }
  ).then(response => {
    dispatch(createAction(t.UPDATE_BLOCK_BATCH, response.update_blocks_many.map(t => t.returning[0])));
    return Promise.resolve(response.update_blocks_many.returning);
  }).catch(ex => {
    dispatch(createAction(t.UPDATE_BLOCK_FAILURE, ex));
    return Promise.reject(ex);
  });
};
