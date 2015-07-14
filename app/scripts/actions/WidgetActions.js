import * as types from '../constants/ActionTypes'

const BASE_URL = process.env.BASE_URL

export function editWidget(params) {
  return {
    type: types.EDIT_WIDGET,
    ...params
  }
}

export function fetchWidgets(params) {
  return dispatch => {
    fetch(`${BASE_URL}/mobilizations/${params.mobilization_id}/widgets`)
    .then(res => res.json())
    .then(res => dispatch({
      type: types.FETCH_WIDGETS,
      widgets: res
    }))
  }
}
