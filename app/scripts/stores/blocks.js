import { FETCH_BLOCKS } from './../constants/ActionTypes'

export default function blocks(state = [], action) {
  switch (action.type) {
    case FETCH_BLOCKS:
      return action.blocks
    default:
      return state
  }
}
