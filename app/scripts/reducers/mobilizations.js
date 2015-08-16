import { FETCH_MOBILIZATIONS, EDIT_MOBILIZATION, ADD_MOBILIZATION } from './../constants/ActionTypes'

export default function mobilizations(state = [], action) {
  switch (action.type) {
    case FETCH_MOBILIZATIONS:
      return action.mobilizations
    case ADD_MOBILIZATION:
      return [...state, action.mobilization]
    case EDIT_MOBILIZATION:
      return state.map(mobilization =>
        mobilization.id == action.mobilization.id ? action.mobilization : mobilization
      )
    default:
      return state
  }
}
