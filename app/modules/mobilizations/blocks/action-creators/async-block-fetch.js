import { createAction } from './create-action'
import {
  REQUEST_FETCH_BLOCKS,
  SUCCESS_FETCH_BLOCKS,
  FAILURE_FETCH_BLOCKS,
} from '../action-types'

const asyncBlockFetch = mobilizationId => (dispatch, getState, axios) => {
  const { auth: { credentials: headers } } = getState()
  dispatch({ type: REQUEST_FETCH_BLOCKS })
  return axios.get(`/mobilizations/${mobilizationId}/blocks`, { headers })
    .then(response => {
      dispatch(createAction(SUCCESS_FETCH_BLOCKS, response.data))
      return Promise.resolve()
    })
    .catch(failure => {
      dispatch(createAction(FAILURE_FETCH_BLOCKS, failure))
      return Promise.reject({ _error: `Response ${failure}` })
    })
}

export default asyncBlockFetch
