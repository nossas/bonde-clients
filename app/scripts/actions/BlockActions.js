import { FETCH_BLOCKS } from '../constants/ActionTypes'

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
