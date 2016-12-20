import { createAction } from './create-action'
import {
  REQUEST_ASYNC_BLOCK_MOVE_UP,
  SUCCESS_ASYNC_BLOCK_MOVE_UP,
  FAILURE_ASYNC_BLOCK_MOVE_UP,
} from '../action-types'

const asyncBlockMoveUp = ({ block, blocks, mobilization }) => (dispatch, getState, axios) => {
  const { auth: { credentials } } = getState()

  const endpoint = `/mobilizations/${mobilization.id}/blocks/${block.id}`
  const body = { block: { position: blocks.data[blocks.data.indexOf(block) - 1].position } }
  const config = { headers: credentials }

  dispatch({ type: REQUEST_ASYNC_BLOCK_MOVE_UP })
  return axios.put(endpoint, body, config)
    .then(response => {
      dispatch(createAction(SUCCESS_ASYNC_BLOCK_MOVE_UP, response.data))
      return Promise.resolve()
    })
    .catch(failure => {
      dispatch(createAction(FAILURE_ASYNC_BLOCK_MOVE_UP, failure))
      return Promise.reject({ _error: `Response ${failure}` })
    })
}

export default asyncBlockMoveUp
