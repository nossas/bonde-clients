import { FETCH_MOBILIZATIONS, EDIT_MOBILIZATION, ADD_MOBILIZATION } from '../constants/ActionTypes'
import * as Paths from '../Paths'
import $ from 'jquery'

export function fetchMobilizations() {
  return dispatch => {
    $.ajax(`${__API_URL__}/mobilizations`, {
      success: function(data, textStatus, jqXHR){
        dispatch({
          type: FETCH_MOBILIZATIONS,
          mobilizations: data
        })
      }
    })
  }
}

export function addMobilization(params) {
  return dispatch => {
    $.ajax(`${__API_URL__}/mobilizations`, {
      method: 'post',
      data: { mobilization: params.mobilization },
      headers: params.credentials,
      success: function(data, textStatus, jqXHR){
        dispatch({
          type: ADD_MOBILIZATION,
          mobilization: data
        })
        params.transitionTo(Paths.cityNewMobilization(data.id))
      }
    })
  }
}

export function editMobilization(params) {
  return dispatch => {
    $.ajax(`${__API_URL__}/mobilizations/${params.id}`, {
      method: 'put',
      data: { mobilization: params.mobilization },
      headers: params.credentials,
      success: function(data, textStatus, jqXHR){
        dispatch({
          type: EDIT_MOBILIZATION,
          mobilization: data
        })
      }
    })
  }
}
