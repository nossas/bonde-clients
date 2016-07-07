import $ from 'jquery'

import { ADD_MATCH, FECTH_MATCH } from '../constants/ActionTypes'


export const addMatch = (params) => {
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

export const fetchMatch = (params) => {
  return dispatch => {
    $.ajax(`${process.env.API_URL}/widgets/${params.widget_id}/match`, {
      method: 'get',
      headers: params.credentials,
      success: function(data, textStatus, jqXHR){
        dispatch({
          type: FECTH_MATCH,
          match_list: data
        })
      }
    })
  }
}
