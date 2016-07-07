import { ADD_MATCH, FETCH_MATCH } from '../constants/ActionTypes'


const reducer = (state={}, action) => {
  switch(action.type) {
    case ADD_MATCH:
      return {
        ...state,
        match: action.match
      }
    case FETCH_MATCH:
      return {
        ...state,
        match_list: action.match_list
      }
  }
  return state
}

export default reducer
