import { FETCH_MOBILIZATIONS } from '../constants/ActionTypes'

const BASE_URL = process.env.BASE_URL

export function fetchMobilizations() {
  return dispatch => {
    fetch(`${BASE_URL}/mobilizations`)
    .then(res => res.json())
    .then(res => dispatch({
      type: FETCH_MOBILIZATIONS,
      mobilizations: res
    }))
  }
}
