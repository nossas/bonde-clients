import { FETCH_MOBILIZATIONS, EDIT_MOBILIZATION } from '../constants/ActionTypes'
import $ from 'jquery'

const BASE_URL = process.env.BASE_URL

export function fetchMobilizations() {
  return dispatch => {
    $.ajax(`${BASE_URL}/mobilizations`, {
      success: function(data, textStatus, jqXHR){
        dispatch({
          type: FETCH_MOBILIZATIONS,
          mobilizations: data
        })
      }
    })
  }
}

export function editMobilization(params) {
  return dispatch => {
    $.ajax(`${BASE_URL}/mobilizations/${params.id}`, {
      method: 'put',
      data: { mobilization: params.mobilization },
      success: function(data, textStatus, jqXHR){
        dispatch({
          type: EDIT_MOBILIZATION,
          mobilization: data
        })
      }
    })
  }
}
