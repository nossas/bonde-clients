import { EDIT_WIDGET, FETCH_WIDGETS } from '../constants/ActionTypes'
import $ from 'jquery'

export function editWidget(params) {
  return dispatch => {
    $.ajax(`${__API_URL__}/mobilizations/${params.mobilization_id}/widgets/${params.widget_id}`, {
      method: 'put',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({ widget: params.widget }),
      headers: params.credentials,
      success: function(data, textStatus, jqXHR){
        dispatch({
          type: EDIT_WIDGET,
          widget: data
        })
      }
    })
  }
}

export function fetchWidgets(params) {
  return dispatch => {
    $.ajax(`${__API_URL__}/mobilizations/${params.mobilization_id}/widgets`, {
      success: function(data, textStatus, jqXHR){
        dispatch({
          type: FETCH_WIDGETS,
          widgets: data
        })
      }
    })
  }
}
