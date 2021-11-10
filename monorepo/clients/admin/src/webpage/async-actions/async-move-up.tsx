import { gql } from "graphql-request";
import * as t from '../action-types'
import apiGraphql from './api-graphql'
// import { createAction } from './create-action'
// import AuthSelectors from '../../../account/redux/selectors'
import Selectors from '../selectors'

const UPDATE_BLOCKS_POSITION = gql`
  mutation ($objects: [blocks_insert_input!]!) {
    insert_blocks(
      objects: $objects,
      on_conflict: {
        constraint: blocks_pkey,
        update_columns: [position]
      }
    ) {
      returning {
        bg_class
        bg_image
        created_at
        deleted_at
        hidden
        id
        menu_hidden
        mobilization_id
        name
        position
        updated_at
      }
    }
  }
`;

export default (dispatch, state) => (block): void => {
  dispatch({ type: t.UPDATE_BLOCK_REQUEST })

  const blocks = Selectors(state).getBlocks()
  const previousBlock = blocks[blocks.indexOf(blocks.find(b => b.id === block.id)) - 1]

  const updatedBlocks = [
    {
      ...block,
      position: previousBlock.position
    },
    {
      ...previousBlock,
      position: block.position
    }
  ];

  apiGraphql.request(UPDATE_BLOCKS_POSITION, { objects: updatedBlocks })
    .then((data) => {
      dispatch({ type: t.UPDATE_BLOCK_BATCH, payload: data.insert_blocks.returning })
    })
    .catch((error) => {
      dispatch({ type: t.UPDATE_BLOCK_FAILURE, payload: error });
    })

  // return api
  //   .put(`/mobilizations/${mobilization.id}/blocks`, body, { headers })
  //   .then(res => {
  //     dispatch(createAction(t.UPDATE_BLOCK_BATCH, res.data))
  //   })
  //   .catch(async error => {
  //     dispatch(createAction(t.UPDATE_BLOCK_FAILURE, error))
  //     return Promise.reject(error)
  //   })
}


// export default block => (dispatch, getState, { api }) => {
//   const headers = AuthSelectors(getState()).getCredentials()
//   const mobilization = Selectors(getState()).getMobilization()
//   const blocks = Selectors(getState()).getBlocks()

//   const previousBlock = blocks[blocks.indexOf(blocks.filter(b => b.id === block.id)[0]) - 1]

//   const body = {
//     mobilization_id: mobilization.id,
//     blocks: [
//       {
//         ...block,
//         position: previousBlock.position
//       },
//       {
//         ...previousBlock,
//         position: block.position
//       }
//     ]
//   }

//   dispatch(createAction(t.UPDATE_BLOCK_REQUEST))
//   return api
//     .put(`/mobilizations/${mobilization.id}/blocks`, body, { headers })
//     .then(res => {
//       dispatch(createAction(t.UPDATE_BLOCK_BATCH, res.data))
//     })
//     .catch(ex => {
//       dispatch(createAction(t.UPDATE_BLOCK_FAILURE, ex))
//       return Promise.reject(ex)
//     })
// }
