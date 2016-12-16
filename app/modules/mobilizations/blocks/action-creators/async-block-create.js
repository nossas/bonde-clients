import { createAction } from './create-action'
import {
  REQUEST_ASYNC_BLOCK_CREATE,
  SUCCESS_ASYNC_BLOCK_CREATE,
  FAILURE_ASYNC_BLOCK_CREATE,
} from '../action-types'

const asyncBlockCreate = ({ block, mobilization }) => (dispatch, getState, axios) => {
  const { auth: { credentials } } = getState()

  const endpoint = `/mobilizations/${mobilization.id}/blocks`
  const body = { block }
  const config = { headers: credentials }

  dispatch({ type: REQUEST_ASYNC_BLOCK_CREATE })
  return axios.post(endpoint, body, config)
    .then(response => {
      dispatch(createAction(SUCCESS_ASYNC_BLOCK_CREATE, response.data))
      return Promise.resolve()
    })
    .catch(failure => {
      dispatch(createAction(FAILURE_ASYNC_BLOCK_CREATE, failure))
      return Promise.reject({ _error: `Response ${failure}` })
    })
}

export default asyncBlockCreate
