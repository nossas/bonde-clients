import { createAction } from './create-action'
import {
  REQUEST_ASYNC_BLOCK_FETCH,
  SUCCESS_ASYNC_BLOCK_FETCH,
  FAILURE_ASYNC_BLOCK_FETCH,
} from '../action-types'

const asyncBlockFetch = mobilizationId => (dispatch, getState, axios) => {
  const { auth: { credentials: headers } } = getState()
  dispatch({ type: REQUEST_ASYNC_BLOCK_FETCH })
  return axios.get(`/mobilizations/${mobilizationId}/blocks`, { headers })
    .then(response => {
      dispatch(createAction(SUCCESS_ASYNC_BLOCK_FETCH, response.data))
      return Promise.resolve()
    })
    .catch(failure => {
      dispatch(createAction(FAILURE_ASYNC_BLOCK_FETCH, failure))
      return Promise.reject({ _error: `Response ${failure}` })
    })
}

export default asyncBlockFetch
