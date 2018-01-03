import { createAction } from './create-action'
import * as t from '../action-types'

import AuthSelectors from '~client/account/redux/selectors'
import Selectors from '../selectors'

export default ({ mobilization, ...block }) => (dispatch, getState, { api }) => {
  const headers = AuthSelectors(getState()).getCredentials()
  mobilization = mobilization || Selectors(getState()).getMobilization()
  if (!mobilization) {
    throw new Error('Mobilization didn`t undefined on asyncUpdateBlock action.')
  }

  dispatch(createAction(t.UPDATE_BLOCK_REQUEST))
  return api
    .put(`/mobilizations/${mobilization.id}/blocks/${block.id}`, { block }, { headers })
    .then(res => {
      dispatch(createAction(t.UPDATE_BLOCK_SUCCESS, res.data))
    })
    .catch(ex => {
      dispatch(createAction(t.UPDATE_BLOCK_FAILURE, ex))
      return Promise.reject(ex)
    })
}
