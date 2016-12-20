import 'babel/polyfill'
import { createAction } from './create-action'
import {
  REQUEST_ASYNC_BLOCK_SELECT,
  SUCCESS_ASYNC_BLOCK_SELECT,
  FAILURE_ASYNC_BLOCK_SELECT,
} from '../action-types'

const asyncBlockSelect = where => (dispatch, getState, axios) => {
  const { auth: { credentials } } = getState()

  const endpoint = '/blocks'
  const config = { headers: credentials, params: where }

  //
  // HTTP GET method passing body?
  // Maybe needs to refact the API endpoint.
  //
  dispatch({ type: REQUEST_ASYNC_BLOCK_SELECT })
  return axios.get(endpoint, config)
    .then(response => {
      dispatch(createAction(SUCCESS_ASYNC_BLOCK_SELECT, response.data))
      return Promise.resolve()
    })
    .catch(failure => {
      dispatch(createAction(FAILURE_ASYNC_BLOCK_SELECT, failure))
      return Promise.reject({ _error: `Response ${failure}` })
    })
}

export default asyncBlockSelect
