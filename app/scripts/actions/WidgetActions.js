import * as types from '../constants/ActionTypes'

export function editWidget(params) {
  return {
    type: types.EDIT_WIDGET,
    ...params
  }
}
