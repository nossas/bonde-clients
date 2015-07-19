import { FETCH_BLOCKS, EDIT_BLOCK, REMOVE_BLOCK } from './../constants/ActionTypes'

export default function blocks(state = [], action) {
  switch (action.type) {
    case FETCH_BLOCKS:
      return action.blocks
    case EDIT_BLOCK:
      var old_position
      var new_position
      let blocks = state.map(function(block) {
        if (block.id == action.block.id) {
          old_position = block.position
          new_position = action.block.position
          return action.block
        } else {
          return block
        }
      })
      if (old_position != new_position) {
        blocks = blocks.map(function(block) {
          if (block.position == new_position && block.id != action.block.id) {
            block.position = old_position
          }
          return block
        })
        return blocks.sort(function(b1, b2){
          return b1.position > b2.position
        })
      } else {
        return blocks
      }
    case REMOVE_BLOCK:
      return state.filter(function(block){
        return action.block.id != block.id
      })
    default:
      return state
  }
}
