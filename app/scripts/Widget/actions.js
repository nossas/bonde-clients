import { EDIT_WIDGET, FETCH_WIDGETS, ADD_MATCH, UPDATE_MATCH, DELETE_MATCH, FETCH_MATCH } from '../constants/ActionTypes'
// TODO: Remove jquery
import $ from 'jquery'

import request from 'superagent'

export const REQUEST_EDIT_WIDGET = 'REQUEST_EDIT_WIDGET'
export const SUCCESS_EDIT_WIDGET = 'SUCCESS_EDIT_WIDGET'
export const FAILURE_EDIT_WIDGET = 'FAILURE_EDIT_WIDGET'

export const REQUEST_FILL_WIDGET = 'REQUEST_FILL_WIDGET'
export const SUCCESS_FILL_WIDGET = 'SUCCESS_FILL_WIDGET'
export const FAILURE_FILL_WIDGET = 'FAILURE_FILL_WIDGET'


const editWidgetRequest = () => {
  return {
    type: REQUEST_EDIT_WIDGET
  }
}

const editWidgetSuccess = (data) => {
  return {
    type: SUCCESS_EDIT_WIDGET,
    widget: data
  }
}

const editWidgetFailure = (error) => {
  return {
    type: FAILURE_EDIT_WIDGET,
    error: error
  }
}


export const editWidget = ({ mobilization_id, widget_id, credentials, widget }) => {
  return dispatch => {
    dispatch(editWidgetRequest())
    request
      .put(`${process.env.API_URL}/mobilizations/${mobilization_id}/widgets/${widget_id}`)
      .set(credentials)
      .send({ widget })
      .end((err, res) => {
        if (err || !res.ok) {
          dispatch(editWidgetFailure(err || res.body))
        } else {
          dispatch(editWidgetSuccess(res.body))
        }
      })
  }
}

const fillWidgetRequest = () => ({ type: REQUEST_FILL_WIDGET })
const fillWidgetFailure = error => ({ type: FAILURE_FILL_WIDGET, error })
const fillWidgetSuccess = data => ({
  //
  // For endpoint reference, see: https://github.com/ourcities/hub-api/issues/39
  //
  type: SUCCESS_FILL_WIDGET,
  counter: { id: data.widget_id, count: data.count }
})

export const fillWidget = (widget_id, fill) => dispatch => {
  dispatch(fillWidgetRequest())
  request
    .post(`${process.env.API_URL}/widgets/${widget_id}/fill`)
    .send({ fill })
    .end((err, res) => {
      if (err || !res.ok) dispatch(fillWidgetFailure(err || res.body))
      else dispatch(fillWidgetSuccess(res.body))
    })
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
  if (params.match.id) {
    return updateMatch(params)
  }
  return addMatch(params)
}

export const deleteMatch = (params) => {
  return dispatch => {
    $.ajax(`${process.env.API_URL}/widgets/${params.widget_id}/match/delete_where`, {
      method: 'delete',
      data: params.match_where,
      headers: params.credentials,
      success: (data, textStatus, jqXHR) => {
        if (data.ok) {
          dispatch({
            ...data.ok,
            type: DELETE_MATCH
          })
        } else {
          // Fix message or error
          console.error('request pattern not equals')
        }
      }
    })
  }
}
