import { EDIT_WIDGET, FETCH_WIDGETS } from '../constants/ActionTypes'
import $ from 'jquery'

const BASE_URL = process.env.BASE_URL

export function editWidget(params) {
  return dispatch => {
    $.ajax(`${BASE_URL}/mobilizations/${params.mobilization_id}/widgets/${params.widget_id}`, {
      method: 'put',
      data: { widget: params.widget },
      success: function(data, textStatus, jqXHR){
        dispatch({
          type: EDIT_WIDGET,
          widgets: data
        })
      }
    })
  }
}

export function fetchWidgets(params) {
  return dispatch => {
    $.ajax(`${BASE_URL}/mobilizations/${params.mobilization_id}/widgets`, {
      success: function(data, textStatus, jqXHR){
        dispatch({
          type: FETCH_WIDGETS,
          widgets: data
        })
      }
    })
  }
}
