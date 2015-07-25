import { FETCH_MOBILIZATIONS } from '../constants/ActionTypes'
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
