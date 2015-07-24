import * as types from '../constants/ActionTypes'

const BASE_URL = process.env.BASE_URL

export function editWidget(params) {
  return dispatch => {
    fetch(`${BASE_URL}/mobilizations/${params.mobilization_id}/widgets/${params.widget_id}`, {
      method: 'put',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ widget: params.widget })
    })
    .then(res => res.json())
    .then(res => dispatch({
      type: types.EDIT_WIDGET,
      widget: res
    }))
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
