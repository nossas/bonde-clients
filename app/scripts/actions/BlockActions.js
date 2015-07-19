import { FETCH_BLOCKS, EDIT_BLOCK, REMOVE_BLOCK } from '../constants/ActionTypes'

const BASE_URL = process.env.BASE_URL

export function fetchBlocks(params) {
  return dispatch => {
    fetch(`${BASE_URL}/mobilizations/${params.mobilization_id}/blocks`)
    .then(res => res.json())
    .then(res => dispatch({
      type: FETCH_BLOCKS,
      blocks: res
    }))
  }
}

export function addBlock(params) {
  return dispatch => {
    fetch(`${BASE_URL}/mobilizations/${params.mobilization_id}/blocks`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        block: {
          bg_class: params.bg_class,
          widgets_attributes: params.widgets
        }
      })
    })
    .then(res => res.json())
    .then(res => console.log(this))
    // TODO redirect to /dashboard/edit
  }
}

export function editBlock(params) {
  return dispatch => {
    fetch(`${BASE_URL}/mobilizations/${params.mobilization_id}/blocks/${params.block_id}`, {
      method: 'put',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ block: params.block })
    })
    .then(res => res.json())
    .then(res => dispatch({
      type: EDIT_BLOCK,
      block: res
    }))
  }
}

export function removeBlock(params) {
  return dispatch => {
    fetch(`${BASE_URL}/mobilizations/${params.mobilization_id}/blocks/${params.block_id}`, {
      method: 'delete',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(res => dispatch({
      type: REMOVE_BLOCK,
      block: res
    }))
  }
}
