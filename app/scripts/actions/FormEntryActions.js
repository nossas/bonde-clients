import { ADD_FORM_ENTRY } from '../constants/ActionTypes'
import * as Paths from '../Paths'
import $ from 'jquery'

const BASE_URL = process.env.BASE_URL

export function addFormEntry(params) {
  return dispatch => {
    $.ajax(`${BASE_URL}/mobilizations/${params.mobilization_id}/form_entries`, {
      method: 'post',
      data: { form_entry: params.form_entry },
      success: function(data, textStatus, jqXHR){
        dispatch({
          type: ADD_FORM_ENTRY,
          form_entry: data
        })
      }
    })
  }
}
