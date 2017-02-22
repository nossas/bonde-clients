import * as t from '../action-types'
import { createAction } from './create-action'
import AuthSelectors from '~authenticate/redux/selectors'

export default ({ block, mobilization }) => (dispatch, getState, { api }) => {
  const headers = AuthSelectors(getState()).getCredentials()

  dispatch(createAction(t.DESTROY_BLOCK_REQUEST))
  return api
    .delete(`/mobilizations/${mobilization.id}/blocks/${block.id}`, { headers })
    .then(response => {
      dispatch(createAction(t.DESTROY_BLOCK_SUCCESS, response.data))
      return Promise.resolve()
    })
    .catch(ex => {
      dispatch(createAction(t.DESTROY_BLOCK_FAILURE, ex))
      return Promise.reject(ex)
    })
}

