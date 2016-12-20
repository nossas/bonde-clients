import { createAction } from './create-action'
import {
  REQUEST_ASYNC_BLOCK_DESTROY,
  SUCCESS_ASYNC_BLOCK_DESTROY,
  FAILURE_ASYNC_BLOCK_DESTROY,
} from '../action-types'

const asyncBlockDestroy = ({ block, mobilization }) => (dispatch, getState, axios) => {
  const { auth: { credentials } } = getState()

  const endpoint = `/mobilizations/${mobilization.id}/blocks/${block.id}`
  const config = { headers: credentials }

  dispatch({ type: REQUEST_ASYNC_BLOCK_DESTROY })
  return axios.delete(endpoint, config)
    .then(response => {
      dispatch(createAction(SUCCESS_ASYNC_BLOCK_DESTROY, response.data))
      return Promise.resolve()
    })
    .catch(failure => {
      dispatch(createAction(FAILURE_ASYNC_BLOCK_DESTROY, failure))
      return Promise.reject({ _error: `Response ${failure}` })
    })
}

export default asyncBlockDestroy
