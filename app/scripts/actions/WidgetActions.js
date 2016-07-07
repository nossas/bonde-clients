import { EDIT_WIDGET, FETCH_WIDGETS, ADD_MATCH, FETCH_MATCH } from '../constants/ActionTypes'
import $ from 'jquery'

export function editWidget(params) {
  return dispatch => {
    $.ajax(`${process.env.API_URL}/mobilizations/${params.mobilization_id}/widgets/${params.widget_id}`, {
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
    $.ajax(`${process.env.API_URL}/mobilizations/${params.mobilization_id}/widgets`, {
      success: function(data, textStatus, jqXHR){
        dispatch({
          type: FETCH_WIDGETS,
          widgets: data
        })
      }
    })
  }
}

export const addMatch = (params) => {
  return dispatch => {
    $.ajax(`${process.env.API_URL}/widgets/${params.widget_id}/match`, {
      method: 'post',
      data: { match: params.match },
      headers: params.credentials,
      success: function(data, textStatus, jqXHR){
        dispatch({
          type: ADD_MATCH,
          match: data.match
        })
      }
    })
  }
}
