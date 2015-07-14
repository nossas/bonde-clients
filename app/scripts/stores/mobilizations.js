import { FETCH_MOBILIZATIONS } from './../constants/ActionTypes'

export default function mobilizations(state = [], action) {
  switch (action.type) {
    case FETCH_MOBILIZATIONS:
      return action.mobilizations
    default:
      return state
  }
}
