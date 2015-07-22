import { FETCH_BLOCKS, EDIT_BLOCK, REMOVE_BLOCK, MOVE_BLOCK_UP, MOVE_BLOCK_DOWN } from './../constants/ActionTypes'

export default function blocks(state = [], action) {
  switch (action.type) {
    case FETCH_BLOCKS:
      return action.blocks
    case EDIT_BLOCK:
      return state.map(function(block) {
        if (block.id == action.block.id) {
          return action.block
        } else {
          return block
        }
      })
    case MOVE_BLOCK_UP:
      return state.map(function(block, index) {
        if (index + 1 < state.length && state[index + 1].id == action.block.id) {
          return action.block
        } else if (block.id == action.block.id) {
          return state[index - 1]
        } else {
          return block
        }
      })
    case MOVE_BLOCK_DOWN:
      return state.map(function(block, index) {
        if (index > 0 && state[index - 1].id == action.block.id) {
          return action.block
        } if (block.id == action.block.id) {
          return state[index + 1]
        } else {
          return block
        }
      })
    case REMOVE_BLOCK:
      return state.filter(function(block){
        return action.block.id != block.id
      })
    default:
      return state
  }
}
