import { EDIT_WIDGET, FETCH_WIDGETS, ADD_MATCH, UPDATE_MATCH, FETCH_MATCH } from '../constants/ActionTypes'
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

const addMatch = (params) => {
  return dispatch => {
    $.ajax(`${process.env.API_URL}/widgets/${params.widget_id}/match`, {
      method: 'post',
      data: { match: params.match },
      headers: params.credentials,
      success: function(data, textStatus, jqXHR){
        dispatch({
          type: ADD_MATCH,
          match: data
        })
      }
    })
  }
}

const updateMatch = (params) => {
  return dispatch => {
    $.ajax(`${process.env.API_URL}/widgets/${params.widget_id}/match/${params.match.id}`, {
      method: 'put',
      data: { match: params.match },
      headers: params.credentials,
      success: (data, textStatus, jqXHR) => {
        dispatch({
          type: UPDATE_MATCH,
          match: data
        })
      }
    })
  }
}

export const createOrUpdateMatch = (params) => {
  console.log('Debugging createOrUpdateMatch')
  console.log(params)
  if (params.match.id) {
    return updateMatch(params)
  }
  return addMatch(params)
}
