import * as t from '~client/subscriptions/redux/action-types'

export const initialState = {
  modificationType: undefined
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case t.SET_MODIFICATION_TYPE:
      return { ...state, modificationType: action.payload }
    default:
      return state
  }
}

