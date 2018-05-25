import * as actionTypes from './actionTypes'

const initialState = {
  title: undefined,
  actions: []
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.CHANGE_TITLE:
      return {
        ...state,
        title: action.payload
      }
    case actionTypes.ADD_ACTIONS:
      return {
        ...state,
        actions: action.payload
      }
    case actionTypes.RESET_ACTIONS:
      return {
        ...state,
        actions: []
      }
    default:
      return state
  }
}
