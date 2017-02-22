import * as t from '../action-types'
import { createAction } from './create-action'

export default relationshipId => (dispatch, getState, { api }) => {
  dispatch(createAction(t.FETCH_MOBILIZATIONS_REQUEST))
  if (relationshipId) {
    return api
      .get(`/communities/${relationshipId}/mobilizations`)
      .then(({ status, data }) => {
        dispatch(createAction(t.FETCH_MOBILIZATIONS_SUCCESS, data))
        return Promise.resolve()
      })
      .catch(ex => {
        dispatch(createAction(t.FETCH_MOBILIZATIONS_FAILURE, ex))
        return Promise.reject(ex)
      })
  }
}
