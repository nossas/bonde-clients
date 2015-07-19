import { FETCH_BLOCKS, EDIT_BLOCK } from './../constants/ActionTypes'

export default function blocks(state = [], action) {
  switch (action.type) {
    case FETCH_BLOCKS:
      return action.blocks
    case EDIT_BLOCK:
      // TODO find out how to trigger reload in PageEdit with this state change
      return state.map(function(block) {
        return (block.id == action.block.id ? action.block : block)
      })
    default:
      return state
  }
}
