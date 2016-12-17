import { createAction } from './create-action'
import {
  REQUEST_ASYNC_BLOCK_UPDATE,
  SUCCESS_ASYNC_BLOCK_UPDATE,
  FAILURE_ASYNC_BLOCK_UPDATE,
} from '../action-types'

const asyncBlockUpdate = ({ block, mobilization }) => (dispatch, getState, axios) => {
  const { auth: { credentials } } = getState()

  const endpoint = `/mobilizations/${mobilization.id}/blocks/${block.id}`
  const body = { block }
  const config = { headers: credentials }

  dispatch({ type: REQUEST_ASYNC_BLOCK_UPDATE })
  return axios.put(endpoint, body, config)
    .then(response => {
      dispatch(createAction(SUCCESS_ASYNC_BLOCK_UPDATE, response.data))
      return Promise.resolve()
    })
    .catch(failure => {
      dispatch(createAction(FAILURE_ASYNC_BLOCK_UPDATE, failure))
      return Promise.reject({ _error: `Response ${failure}` })
    })
}

export default asyncBlockUpdate
