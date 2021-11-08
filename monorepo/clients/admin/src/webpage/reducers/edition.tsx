import * as t from '../actionTypes'

export interface StateEdition {
  isEditing: boolean;
  mode?: any
}

export const initialState = {
  isEditing: false,
  mode: undefined
}

export default (state: StateEdition = initialState, action: any = {}) => {
  switch (action.type) {
    case t.TURN_ON_EDITION:
      return {...state,
        isEditing: true,
        mode: action.payload
      }
    case t.TURN_OFF_EDITION:
      return {...state,
        isEditing: false,
        mode: undefined
      }
    default:
      return state
  }
}
