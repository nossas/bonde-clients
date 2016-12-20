import { REMOVE_BLOCK, MOVE_BLOCK_UP, MOVE_BLOCK_DOWN } from '../constants/ActionTypes'
import * as Paths from '../Paths'
import $ from 'jquery'

export function moveBlockUp(params) {
  const { block, blocks } = params
  return dispatch => {
    $.ajax(`${process.env.API_URL}/mobilizations/${params.mobilization_id}/blocks/${block.id}`, {
      method: 'put',
      data: {
        block: {
          position: blocks.data[blocks.data.indexOf(block) - 1].position
        }
      },
      headers: params.credentials,
      success: function(data, textStatus, jqXHR){
        dispatch({
          type: MOVE_BLOCK_UP,
          block: data
        })
      }
    })
  }
}

export function moveBlockDown(params) {
  const { block, blocks } = params
  return dispatch => {
    $.ajax(`${process.env.API_URL}/mobilizations/${params.mobilization_id}/blocks/${block.id}`, {
      method: 'put',
      data: {
        block: {
          position: blocks.data[blocks.data.indexOf(block) + 1].position
        }
      },
      headers: params.credentials,
      success: function(data, textStatus, jqXHR){
        dispatch({
          type: MOVE_BLOCK_DOWN,
          block: data
        })
      }
    })
  }
}
